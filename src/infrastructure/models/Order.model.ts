import { BaseModel } from './common/base-model';
import { RelationMappings, Model } from 'objection';
import { Maybe } from 'graphql/jsutils/Maybe';
import { ProductModel } from './product.model';
import * as yup from 'yup';

export class OrderModel extends BaseModel {
  static tableName = 'order';

  static relationMappings: RelationMappings = {
    product: {
      relation: Model.ManyToManyRelation,
      modelClass: `${__dirname}/Product.model`,
      join: {
        from: 'order.id',
        through: {
          from: 'orderItem.orderId',
          to: 'orderItem.productId',
          extra: ['quantity', 'unitPrice'],
        },
        to: 'product.id',
      },
    },
  };

  static yupSchema = {
    customerName: yup.string().required(),

    address: yup.string().required(),

    email: yup.string().email().required(),
  };

  id!: string;
  customerName!: string;
  address!: string;
  email!: string;
  createdAt!: Date;
  updatedAt!: Date;
  products!: Maybe<ProductModel[]>;
}
