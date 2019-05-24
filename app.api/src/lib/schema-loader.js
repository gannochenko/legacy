import SchemaEntity from '../entity/schema';

const load = async (type, connectionManager) => {
    const connection = await connectionManager.getSystem();
    const repo = connection.getRepository(SchemaEntity);

    const structure = await repo.findOne({
        draft: type === 'draft',
    });

    return new this(structure.structure);
};

export default load;
