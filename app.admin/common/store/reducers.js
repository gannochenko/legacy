import ApplicationReducer from '../components/Application/reducer';
import HomePageReducer from '../pages/home/reducer';
import DataPageReducer from '../pages/data/reducer';
import StructurePageReducer from '../pages/structure/reducer';

export default {
    application: ApplicationReducer,
    home: HomePageReducer,
    data: DataPageReducer,
    structure: StructurePageReducer,
};
