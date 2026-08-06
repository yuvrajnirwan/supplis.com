import { SupplisBackendApplication } from './application';


// Navigate out of 'supplis' backend into the relative 'frontend' directory
import aminos from './data/aminos.json';
import creatines from './data/creatines.json';
import multivitamins from './data/multivitamins.json';
import omegas from './data/omegas.json';
import preworkouts from './data/preworkout.json';
import proteins from './data/proteins.json';
import salts from './data/salts.json';
import vitamins from './data/vitamins.json';
import weightManagement from './data/weightManagement.json';

import {
  AminoProductRepository,
  CreatineProductRepository,
  MultivitaminProductRepository,
  OmegaProductRepository,
  PreWorkoutProductRepository,
  ProteinProductRepository,
  SaltProductRepository,
  SingleVitaminProductRepository,
  WeightManagementProductRepository,
} from './repositories';

export async function seedData() {
  const app = new SupplisBackendApplication();
  await app.boot();

  const proteinRepo = await app.getRepository(ProteinProductRepository);
  const multivitaminRepo = await app.getRepository(MultivitaminProductRepository);
  const omegaRepo = await app.getRepository(OmegaProductRepository);
  const preworkoutRepo = await app.getRepository(PreWorkoutProductRepository);
  const saltRepo = await app.getRepository(SaltProductRepository);
  const singleVitaminRepo = await app.getRepository(SingleVitaminProductRepository);
  const weightManageRepo = await app.getRepository(WeightManagementProductRepository);
  const aminoRepo = await app.getRepository(AminoProductRepository);
  const creatineRepo = await app.getRepository(CreatineProductRepository);

  console.log('Seeding products from frontend folder into database...');

  async function seedCategory(repo: any, data: any[], categoryName: string) {
    for (const item of data) {
      try {
        const exists = await repo.exists(item.id);
        if (!exists) {
          await repo.create(item);
        }
      } catch (err) {
        console.error(`Failed to insert ${item.id} in ${categoryName}:`, err);
      }
    }
    console.log(`✔ ${categoryName} seeded (${data.length} items)`);
  }

  await seedCategory(proteinRepo, proteins, 'Proteins');
  await seedCategory(multivitaminRepo, multivitamins, 'Multivitamins');
  await seedCategory(omegaRepo, omegas, 'Omegas');
  await seedCategory(preworkoutRepo, preworkouts, 'Pre-Workouts');
  await seedCategory(saltRepo, salts, 'Salts');
  await seedCategory(singleVitaminRepo, vitamins, 'Vitamins');
  await seedCategory(weightManageRepo, weightManagement, 'Weight Management');
  await seedCategory(aminoRepo, aminos, 'Aminos');
  await seedCategory(creatineRepo, creatines, 'Creatines');

  console.log('All data successfully seeded!');
  process.exit(0);
}

seedData().catch((err) => {
  console.error('Data seeding failed:', err);
  process.exit(1);
});
