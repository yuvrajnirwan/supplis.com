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
  ProteinProduct,
} from '../models';
import {CategoryRepository} from '../repositories';

export class CategoryProteinProductController {
  constructor(
    @repository(CategoryRepository) protected categoryRepository: CategoryRepository,
  ) { }

  @get('/categories/{id}/protein-products', {
    responses: {
      '200': {
        description: 'Array of Category has many ProteinProduct',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProteinProduct)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ProteinProduct>,
  ): Promise<ProteinProduct[]> {
    return this.categoryRepository.proteinProducts(id).find(filter);
  }

  @post('/categories/{id}/protein-products', {
    responses: {
      '200': {
        description: 'Category model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProteinProduct)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Category.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProteinProduct, {
            title: 'NewProteinProductInCategory',
            exclude: ['id'],
            optional: ['categoryId']
          }),
        },
      },
    }) proteinProduct: Omit<ProteinProduct, 'id'>,
  ): Promise<ProteinProduct> {
    return this.categoryRepository.proteinProducts(id).create(proteinProduct);
  }

  @patch('/categories/{id}/protein-products', {
    responses: {
      '200': {
        description: 'Category.ProteinProduct PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProteinProduct, {partial: true}),
        },
      },
    })
    proteinProduct: Partial<ProteinProduct>,
    @param.query.object('where', getWhereSchemaFor(ProteinProduct)) where?: Where<ProteinProduct>,
  ): Promise<Count> {
    return this.categoryRepository.proteinProducts(id).patch(proteinProduct, where);
  }

  @del('/categories/{id}/protein-products', {
    responses: {
      '200': {
        description: 'Category.ProteinProduct DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ProteinProduct)) where?: Where<ProteinProduct>,
  ): Promise<Count> {
    return this.categoryRepository.proteinProducts(id).delete(where);
  }
}
