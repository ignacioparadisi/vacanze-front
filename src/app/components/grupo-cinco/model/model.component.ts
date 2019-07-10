import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import Swal from 'sweetalert2';
import { Veh_Model } from '../../../classes/veh_model';

@Component({
	selector: 'app-model',
	templateUrl: './model.component.html',
	styleUrls: ['./model.component.scss']
})
export class ModelComponent {

	models: Array<Veh_Model>;
	public searchText : string;

	constructor(private apiService: ApiService) { }

	ngOnInit() {
		this.getModels();
	}

	getModels() {
		this.apiService.getUrl('models').then(
			(resp) => {
				this.models = resp;
			},
			(fail) => {
				if (fail.error) {
					Swal.fire({
						title: fail.error,
						type: 'error',
					})
				} else {
					Swal.fire({
						title: 'Error: ' + fail.status,
						text: fail.name + '. ' + fail.statusText,
						type: 'error',
					})
				}
			}
		);
	}
}
