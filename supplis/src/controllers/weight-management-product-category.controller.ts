import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  WeightManagementProduct,
  Category,
} from '../models';
import {WeightManagementProductRepository} from '../repositories';

export class WeightManagementProductCategoryController {
  constructor(
    @repository(WeightManagementProductRepository)
    public weightManagementProductRepository: WeightManagementProductRepository,
  ) { }

  @get('/weight-management-products/{id}/category', {
    responses: {
      '200': {
        description: 'Category belonging to WeightManagementProduct',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Category),
          },
        },
      },
    },
  })
  async getCategory(
    @param.path.string('id') id: typeof WeightManagementProduct.prototype.id,
  ): Promise<Category> {
    return this.weightManagementProductRepository.category(id);
  }
}
