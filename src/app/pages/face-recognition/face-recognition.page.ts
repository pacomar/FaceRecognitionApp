import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Face } from 'src/app/models/face';
import {
	CameraPreview,
	CameraPreviewPictureOptions,
	CameraPreviewOptions,
	CameraPreviewDimensions
} from '@ionic-native/camera-preview/ngx';

@Component({
	selector: 'app-face-recognition',
	templateUrl: './face-recognition.page.html',
	styleUrls: ['./face-recognition.page.scss']
})
export class FaceRecognitionPage implements OnInit, AfterViewInit {
	@ViewChild('layout') canvasRef;
	image = '/assets/faces.jpeg';

	faces: Face[];

	constructor(
		private httpClient: HttpClient,
		private cameraPreview: CameraPreview
	) {}

	ngOnInit() {
		const cameraPreviewOpts: CameraPreviewOptions = {
			x: 0,
			y: 0,
			width: window.screen.width,
			height: window.screen.height,
			camera: 'rear',
			tapPhoto: true,
			previewDrag: true,
			toBack: true,
			alpha: 1
		};

		// start camera
		this.cameraPreview.startCamera(cameraPreviewOpts).then(
			res => {
				console.log(res);
			},
			err => {
				console.log(err);
			}
		);

		// Set the handler to run every time we take a picture
		this.cameraPreview.setOnPictureTakenHandler().subscribe(result => {
			console.log(result);
			// do something with the result
		});

		// picture options
		const pictureOpts: CameraPreviewPictureOptions = {
			width: 1280,
			height: 1280,
			quality: 85
		};

		// take a picture
		this.cameraPreview.takePicture(this.pictureOpts).then(
			imageData => {
				this.picture = 'data:image/jpeg;base64,' + imageData;
			},
			err => {
				console.log(err);
				this.picture = 'assets/img/test.jpg';
			}
		);

		// Switch camera
		this.cameraPreview.switchCamera();

		// set color effect to negative
		this.cameraPreview.setColorEffect('negative');

		// Stop the camera preview
		this.cameraPreview.stopCamera();
	}

	ngAfterViewInit() {
		const canvas = this.canvasRef.nativeElement;
		const context = canvas.getContext('2d');

		const source = new Image();
		source.crossOrigin = 'Anonymous';
		source.onload = () => {
			canvas.height = source.height;
			canvas.width = source.width;
			context.drawImage(source, 0, 0);

			// context.font = '100px impact';
			// context.textAlign = 'center';
			// context.fillStyle = 'black';
			context.lineWidth = '10';
			context.strokeStyle = 'blue';
			// context.rect(670, 522, 129, 129);
			// context.rect(443, 346, 110, 110);
			// context.rect(20, 20, 150, 100);
			// context.rect(20, 20, 150, 100);

			this.faces.forEach(elem => {
				context.rect(
					elem.faceRectangle.left,
					elem.faceRectangle.top,
					elem.faceRectangle.width,
					elem.faceRectangle.height
				);
			});

			context.stroke();

			this.image = canvas.toDataURL();
		};
		source.src = this.image;
	}

	getFaces() {
		const formData = new FormData();

		this.httpClient.post(
			'https://westeurope.api.cognitive.microsoft.com/face/v1.0/detect',
			{}
		);
	}
}
