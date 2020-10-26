import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { ProgrammingRow } from "./ProgrammingRow";
import { Whiteboard } from "./Whiteboard";

@Entity()
export class WhiteboardRowRel extends BaseEntity {
  @PrimaryColumn()
  whiteboard_id: number;

  @PrimaryColumn()
  programming_row_id: number;

  // Join whiteboard
  @ManyToOne(
    () => Whiteboard,
    (whiteboard) => whiteboard.programming_rows_connections,
    {
      onDelete: "CASCADE",
    }
  )
  @JoinColumn({ name: "whiteboard_id" })
  whiteboard: Promise<Whiteboard>;

  // Join ProgrammingRow
  @ManyToOne(
    () => ProgrammingRow,
    (programmingRow) => programmingRow.whiteboard_connection,
    {
      onDelete: "CASCADE",
    }
  )
  @JoinColumn({ name: "programming_row_id" })
  programming_row: Promise<ProgrammingRow>;
}
