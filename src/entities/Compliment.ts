import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";

import { v4 as uuid } from "uuid";
import { User } from "./User";
import { Tag } from "./Tag";

@Entity("compliments")
class Compliment {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  user_s: string;

  @JoinColumn({ name: "user_s" })
  @ManyToOne(() => User)
  UserS: User;

  @Column()
  user_r: string;

  @JoinColumn({ name: "user_r" })
  @ManyToOne(() => User)
  UserR: User;

  @Column()
  tag_id: string;

  @JoinColumn({ name: "tag_id" })
  @ManyToOne(() => Tag)
  tag: Tag;

  @Column()
  message: string;

  @CreateDateColumn()
  created_dt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
export { Compliment };
