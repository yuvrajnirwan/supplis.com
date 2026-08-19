import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PreWorkoutProduct,
  Category,
} from '../models';
import {PreWorkoutProductRepository} from '../repositories';

export class PreWorkoutProductCategoryController {
  constructor(
    @repository(PreWorkoutProductRepository)
    public preWorkoutProductRepository: PreWorkoutProductRepository,
  ) { }

  @get('/pre-workout-products/{id}/category', {
    responses: {
      '200': {
        description: 'Category belonging to PreWorkoutProduct',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Category),
          },
        },
      },
    },
  })
  async getCategory(
    @param.path.string('id') id: typeof PreWorkoutProduct.prototype.id,
  ): Promise<Category> {
    return this.preWorkoutProductRepository.category(id);
  }
}
