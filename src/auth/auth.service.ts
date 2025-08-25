import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User, UserRole } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from './dto/register.dto';
import bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import config from 'src/config/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.userRepository.exists({
      where: { email: registerDto.email },
    });
    if (existingUser) {
      throw new ConflictException(
        'Email already in use , please try with different email',
      );
    }

    const hashedPassword = await this.hashPassword(registerDto.password);
    const newlyCreatedUser = this.userRepository.create({
      email: registerDto.email,
      name: registerDto.name,
      password: hashedPassword,
    });

    const saveUser = await this.userRepository.save(newlyCreatedUser);

    const { password: _, ...result } = saveUser;
    return {
      user: result,
      message: 'Registration successful, please login to continue',
    };
  }

  async createAdmin(registerDto: RegisterDto) {
    const existingUser = await this.userRepository.exists({
      where: { email: registerDto.email },
    });
    if (existingUser) {
      throw new ConflictException(
        'Email already in use , please try with different email',
      );
    }

    const hashedPassword = await this.hashPassword(registerDto.password);
    const newlyCreatedUser = this.userRepository.create({
      email: registerDto.email,
      name: registerDto.name,
      password: hashedPassword,
      role: UserRole.ADMIN,
    });

    const saveUser = await this.userRepository.save(newlyCreatedUser);

    const { password: _, ...result } = saveUser;
    return {
      user: result,
      message: 'Admin user created successful, please login to continue',
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });
    if (!user) {
      throw new UnauthorizedException('No user found!');
    }
    const isValidPassword = await this.validPassword(
      user.password,
      loginDto.password,
    );
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // now generate the token
    const token = this.generateToken(user);
    const { password, ...result } = user;
    return {
      user: result,
      ...token,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify<{ sub: number }>(refreshToken, {
        secret: config().refreshSecret,
      });
      const user = await this.userRepository.findOne({
        where: {
          id: payload.sub,
        },
      });
      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }
      const accessToken = this.generateAccessToken(user);
      return accessToken;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
  // find current user by id
  async getUserById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new UnauthorizedException('User not found!');
    }
    const { password, ...result } = user;
    return result;
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  private async validPassword(
    hashedOne: string,
    nonHashedOne: string,
  ): Promise<boolean> {
    return await bcrypt.compare(nonHashedOne, hashedOne);
  }

  private generateToken(user: User) {
    return {
      accessToken: this.generateAccessToken(user),
      refreshToken: this.generateRefreshToken(user),
    };
  }
  private generateAccessToken(user: User): string {
    // -> email, sub(id), role -> vvi -> RBAC -> user ? Admin?
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };
    return this.jwtService.sign(payload, {
      secret: config().jwtSecret,
      expiresIn: '15m',
    });
  }
  private generateRefreshToken(user: User): string {
    const payload = {
      sub: user.id,
    };
    return this.jwtService.sign(payload, {
      secret: config().refreshSecret,
      expiresIn: '7d',
    });
  }
}
