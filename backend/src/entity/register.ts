import { Exclude } from 'class-transformer';
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import bcrypt from 'bcryptjs';

@Entity()
export class Register {
  private static readonly saltRounds = 10;
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  email: string;

  @Column({ length: 1000 })
  @Exclude()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt(Register.saltRounds);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }
}
