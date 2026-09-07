import {Entity, model, property} from '@loopback/repository';

@model()
export class Order extends Entity {
  @property({
    type: 'string',
    id: true,
    defaultFn: 'uuidv4',
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  userId: string;


  @property({
    type: 'number',
    required: true,
    postgresql: {
      dataType: 'numeric',
      dataPrecision: 10,
      dataScale: 2,
    },
  })
  totalAmount: number;

  @property({
    type: 'string',
    default: 'PENDING',
  })
  status?: string;

  @property({
    type: 'array',
    itemType: 'object',
  })
  items?: object[];

  constructor(data?: Partial<Order>) {
    super(data);
  }
}
