import { Test, TestingModule } from '@nestjs/testing';
import { ClassgroupsService } from './classgroups.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('ClassgroupsService', () => {
  let service: ClassgroupsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClassgroupsService,
        {
          provide: PrismaService,
          useValue: {
            classgroup: {
              create: jest.fn().mockResolvedValue({}),
              createMany: jest.fn().mockResolvedValue({}),
              findMany: jest.fn().mockResolvedValue([]),
              findUnique: jest.fn().mockResolvedValue({}),
              findFirst: jest.fn().mockResolvedValue({}),
              delete: jest.fn().mockResolvedValue({}),
              update: jest.fn().mockResolvedValue({}),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ClassgroupsService>(ClassgroupsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('create a new classgroup and return it', async () => {
      const createClassgroupDto = {
        file: 'file1.xml',
        name: 'file1',
      };
      await service.create(createClassgroupDto);
      expect(prisma.classgroup.create).toHaveBeenCalledWith({
        data: createClassgroupDto,
      });
    });
  });

  describe('createMany', () => {
    it('create multuple new classgroups and return them', async () => {
      const createClassgroupDtos = [
        {
          file: 'file2.xml',
          name: 'file2',
        },
        {
          file: 'file3.xml',
          name: 'file3',
        },
      ];
      await service.createMany(createClassgroupDtos);
      expect(prisma.classgroup.createMany).toHaveBeenCalledWith({
        data: createClassgroupDtos,
      });
    });
  });

  describe('findAll', () => {
    it('return all classgroups', async () => {
      await service.findAll();
      expect(prisma.classgroup.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('return a classgroup by its id', async () => {
      const id = Math.floor(Math.random() * 100);
      await service.findOne(id);
      expect(prisma.classgroup.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });

  describe('findByFile', () => {
    it('return a classgroup by its file', async () => {
      const file = 'B1 Groupe 1.xml';
      await service.findByFile(file);
      expect(prisma.classgroup.findFirst).toHaveBeenCalledWith({
        where: { file },
      });
    });
  });

  describe('delete', () => {
    it('delete an existing class', async () => {
      const id = Math.floor(Math.random() * 100);
      await service.delete(id);
      expect(prisma.classgroup.delete).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });

  describe('upsert', () => {
    it('update an existing classgroup or create a new one if it does not exist', async () => {
      const param = {
        create: {
          file: 'I2 Groupe 1.xml',
          name: 'I2 Groupe 1',
        },
        update: {
          file: 'I3 Groupe 4.xml',
          name: 'I3 Groupe 4.xml',
        },
        where: { file: 'fileTest.xml' },
      };
      const isExisting = await service.findByFile(param.where.file);
      if (isExisting) {
        await service.upsert(param);
        expect(prisma.classgroup.update).toHaveBeenCalledWith({
          where: { id: isExisting.id },
          data: param.update,
        });
      } else {
        await service.upsert(param);
        expect(prisma.classgroup.create).toHaveBeenCalledWith({
          data: param.create,
        });
      }
    });
  });
});
