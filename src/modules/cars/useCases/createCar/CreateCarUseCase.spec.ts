import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

beforeEach(() => {
  carsRepositoryInMemory = new CarsRepositoryInMemory();
  createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
});

describe("Create Car", () => {
  it("should be able to create a new car", async () => {
    await createCarUseCase.execute({
      name: "Name Car",
      description: "description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });
  });

  it("should not be able to create a car with exists license plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car1",
        description: "description car",
        daily_rate: 100,
        license_plate: "ABC-4321",
        fine_amount: 60,
        brand: "Brand",
        category_id: "category",
      });

      await createCarUseCase.execute({
        name: "Car2",
        description: "description car",
        daily_rate: 100,
        license_plate: "ABC-4321",
        fine_amount: 60,
        brand: "Brand",
        category_id: "category",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
