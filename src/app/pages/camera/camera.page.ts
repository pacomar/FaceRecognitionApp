import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
	selector: 'app-camera',
	templateUrl: './camera.page.html',
	styleUrls: ['./camera.page.scss']
})
export class CameraPage implements OnInit {
	image: string = null;

	constructor(private camera: Camera) {}

	ngOnInit() {}

	getPicture() {
		const options: CameraOptions = {
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE,
			targetWidth: 1000,
			targetHeight: 1000,
			quality: 100,
			cameraDirection: 0,
			correctOrientation: true
		};

		this.camera.getPicture(options).then(
			imageData => {
				// imageData is either a base64 encoded string or a file URI
				// If it's base64 (DATA_URL):
				this.image = 'data:image/jpeg;base64,' + imageData;
			},
			err => {
				// Handle error
			}
		);
	}
}
