import { faker } from '@faker-js/faker';

export const generatePlants = (count: number) => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(), // Updated method for generating UUIDs
    name: faker.commerce.productName(),
    species: faker.lorem.word(),
    description: faker.lorem.sentence(),
    careSchedule: Array.from({ length: 5 }, (_, i) => ({
      day: `Day ${i + 1}`,
      action: faker.lorem.words(3),
    })),
  }));
};
