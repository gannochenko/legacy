import { Injectable } from '@nestjs/common';
import { IDType } from '../type';
import { ObjectEntity } from '../entities/ObjectEntity';

type AuthorCreationInputType = {
    firstName: string;
    lastName: string;
};

type AuthorUpdateInputType = {
    firstName?: string;
    lastName?: string;
};

@Injectable()
export class ObjectsService {
    async create(data: AuthorCreationInputType): Promise<null> {
        console.log(data);

        return null;
    }

    // // todo: get only the requested fields, don't use *
    // async update(
    //     id: IDType,
    //     data: AuthorUpdateInputType,
    // ): Promise<ObjectEntity> {
    //     return await this.usersRepository.findOne(id);
    // }
    //
    // // todo: get only the requested fields, don't use *
    // async delete(id: IDType): Promise<ObjectEntity> {
    //
    //     return element;
    // }
    //
    // async findAll({ filter, limit }: ObjectLiteralType = {}): Promise<
    //     ObjectEntity[]
    // > {
    //     return this.usersRepository.find(filter);
    // }
    //
    // // todo: get only the requested fields, don't use *
    // async findOneById(
    //     id: IDType,
    //     { select }: FindOneOptions<ObjectEntity> = {},
    // ): Promise<ObjectEntity> {
    //     return this.usersRepository.findOne(id, {
    //         select,
    //     });
    // }
    //
    // async isElementExists(id: IDType): Promise<boolean> {
    //     const element = await this.usersRepository.findOne(id, {
    //         select: ['id'],
    //     });
    //
    //     return !!element;
    // }
}
