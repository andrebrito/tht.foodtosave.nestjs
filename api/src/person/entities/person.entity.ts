interface Props {
  id: number;
  name: string;
  createdAt: Date;
}

export class PersonEntity {
  id: number;
  name: string;
  createdAt: Date;

  constructor(props: Props) {
    this.id = props.id;
    this.name = props.name;
    this.createdAt = props.createdAt;
  }
}
