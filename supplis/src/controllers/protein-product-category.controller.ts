import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ProteinProduct,
  Category,
} from '../models';
import {ProteinProductRepository} from '../repositories';

export class ProteinProductCategoryController {
  constructor(
    @repository(ProteinProductRepository)
    public proteinProductRepository: ProteinProductRepository,
  ) { }

  @get('/protein-products/{id}/category', {
    responses: {
      '200': {
        description: 'Category belonging to ProteinProduct',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Category),
          },
        },
      },
    },
  })
  async getCategory(
    @param.path.string('id') id: typeof ProteinProduct.prototype.id,
  ): Promise<Category> {
    return this.proteinProductRepository.category(id);
  }
}
