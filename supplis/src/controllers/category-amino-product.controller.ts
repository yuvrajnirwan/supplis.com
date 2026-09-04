import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Category,
  AminoProduct,
} from '../models';
import {CategoryRepository} from '../repositories';

export class CategoryAminoProductController {
  constructor(
    @repository(CategoryRepository) protected categoryRepository: CategoryRepository,
  ) { }

  @get('/categories/{id}/amino-products', {
    responses: {
      '200': {
        description: 'Array of Category has many AminoProduct',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(AminoProduct)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<AminoProduct>,
  ): Promise<AminoProduct[]> {
    return this.categoryRepository.aminoProducts(id).find(filter);
  }

  @post('/categories/{id}/amino-products', {
    responses: {
      '200': {
        description: 'Category model instance',
        content: {'application/json': {schema: getModelSchemaRef(AminoProduct)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Category.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AminoProduct, {
            title: 'NewAminoProductInCategory',
            exclude: ['id'],
            optional: ['category']
          }),
        },
      },
    }) aminoProduct: Omit<AminoProduct, 'id'>,
  ): Promise<AminoProduct> {
    return this.categoryRepository.aminoProducts(id).create(aminoProduct);
  }

  @patch('/categories/{id}/amino-products', {
    responses: {
      '200': {
        description: 'Category.AminoProduct PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AminoProduct, {partial: true}),
        },
      },
    })
    aminoProduct: Partial<AminoProduct>,
    @param.query.object('where', getWhereSchemaFor(AminoProduct)) where?: Where<AminoProduct>,
  ): Promise<Count> {
    return this.categoryRepository.aminoProducts(id).patch(aminoProduct, where);
  }

  @del('/categories/{id}/amino-products', {
    responses: {
      '200': {
        description: 'Category.AminoProduct DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(AminoProduct)) where?: Where<AminoProduct>,
  ): Promise<Count> {
    return this.categoryRepository.aminoProducts(id).delete(where);
  }
}
