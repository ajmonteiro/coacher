import { BaseHttpService } from '@resourge/http-service';

import { envBaseUrl } from '../utils/Environment';
class NewHttpService extends BaseHttpService {
	
}

const HttpBaseService = new NewHttpService({
	baseUrl: envBaseUrl
});

export default HttpBaseService;
