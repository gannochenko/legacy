import ApplicationReducer from '../components/Application/reducer';
import HomePageReducer from '../pages/home/reducer';
import DataPageReducer from '../pages/data/reducer';
import DataDetailPageReducer from '../pages/data-detail/reducer';
import SchemaPageReducer from '../pages/schema/reducer';

export default {
    application: ApplicationReducer,
    home: HomePageReducer,
    data: DataPageReducer,
    'data-detail': DataDetailPageReducer,
    schema: SchemaPageReducer,
};
