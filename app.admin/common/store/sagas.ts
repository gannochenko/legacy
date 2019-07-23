import ApplicationSaga from '../components/Application/saga';
import HomePageSaga from '../pages/home/saga';
import DataPageSaga from '../pages/data/saga';
import DataDetailPageSaga from '../pages/data-detail/saga';
import SchemaPageSaga from '../pages/schema/saga';

export default [
    ApplicationSaga,
    HomePageSaga,
    DataPageSaga,
    DataDetailPageSaga,
    SchemaPageSaga,
];
