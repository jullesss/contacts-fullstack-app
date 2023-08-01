import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity("contacts")
class Contact {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 45 })
  firstName: string;

  @Column({ type: "varchar", length: 45 })
  lastName: string;

  @Column({ type: "varchar" })
  phone: string;

  @Column({ type: "varchar", length: 45 })
  email: string;

  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @ManyToOne(() => User)
  user: User;
}

export { Contact };
