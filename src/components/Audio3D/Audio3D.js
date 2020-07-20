import React from 'react';
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';
import { TweenMax, Power2 } from "gsap/TweenMax";
import './Audio3D.scss';

const Audio3D = (props) => {

    const [songName, setSongName] = React.useState(' ');
    const [songArtist, setSongArtist] = React.useState(' ');

    const canvasParent = React.useRef();
    const sketch = React.useRef();

    React.useEffect(() => {
        sketch.current = AudioVisualization(canvasParent.current, props.bgColor, props.fgColor);
    }, []);

    React.useEffect(() => {
        if (props.onPlay) {
            sketch.current.play();
        } else {
            sketch.current.pause();
        }
    }, [props.onPlay]);

    React.useEffect(() => {
        sketch.current.setSceneColor(props.bgColor);
    }, [props.bgColor]);

    React.useEffect(() => {
        sketch.current.setTalesColor(props.fgColor);
    }, [props.fgColor]);

    React.useEffect(() => {
        sketch.current.setSongFile(props.mp3File);
    }, [props.mp3File]);


    React.useEffect(() => {
        var getFileName = props.fileName.replace('.mp3', '').split('-', 2);
        setSongName(getFileName[1]);
        setSongArtist(getFileName[0]);
    }, [props.fileName]);

    return (
        <div className="Audio3D" width="65%" height="100%" ref={canvasParent} style={{backgroundColor: props.bgColor}}>
            <h1 style={{color: props.fgColor}}>{songName}</h1>
            <h2 style={{color: props.fgColor}}>{songArtist}</h2>
        </div>
    )
}

const AudioVisualization = (canvas, bgColor, fgColor) => {

    class App {

        constructor() {

            console.log('INGRESA AL CONSTRUCTOR DE AUDIO 3D');
            this.songFile = 'https://iondrimbafilho.me/autotron.mp3';
            //this.songFile = 'https://iondrimbafilho.me/3d5/ocean_drive.mp3';
            //this.songFile = './songs/subhuman.mp3';

            this.percent = 0;
            this.playing = false;
            this.volume = 1;
            this.sceneBackGroundColor = bgColor;
            this.objectsColor = fgColor;
            this.rowTiles = [];
            this.groupTiles = new THREE.Object3D();
            this.complete();
            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color(this.sceneBackGroundColor);
        }

        setSongFile(newSongFile) {

            if (this.audioElement) {
                this.audioElement.pause();
            }

            this.songFile = newSongFile;
            console.log('///////////// ENTRA A CAMBIO DE AUDIO ////////////////');
            this.setupAudio();
        }

        setSceneColor(newColor) {
            this.scene.background = new THREE.Color(newColor);
        }

        setTalesColor(newColor) {
            this.objectsColor = newColor;
        }

        setupAudio() {
            this.audioElement = new Audio();
            this.audioElement.src = this.songFile;
            //this.audioElement.crossOrigin = 'anonymous';
            //this.audioElement.controls = false;
            //this.audioElement.loop = true;
            //this.audioElement.autoplay = true;
            //this.audioElement.addEventListener( 'canplaythrough', audioLoaded, false );

            this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();

            this.analyser = this.audioCtx.createAnalyser();
            this.analyser.fftSize = 2048;
            this.analyser.smoothingTimeConstant = .85;

            this.source = this.audioCtx.createMediaElementSource(this.audioElement);
            this.source.connect(this.analyser);
            this.source.connect(this.audioCtx.destination);

            this.bufferLength = this.analyser.frequencyBinCount;

            this.frequencyData = new Uint8Array(this.bufferLength);
            this.audioElement.volume = this.volume;

            this.audioElement.addEventListener('playing', () => {
                this.playing = true;
            });
            this.audioElement.addEventListener('pause', () => {
                this.playing = false;
            });
            this.audioElement.addEventListener('ended', () => {
                this.playing = false;
                this.pause();
            });
        }

        complete() {
            setTimeout(() => {
                this.firstRing = new THREE.Object3D();

                this.setupAudio();
                this.createScene();
                this.createCamera();
                this.addAmbientLight();
                this.addSpotLight();
                this.addCameraControls();
                this.addFloor();
                this.animate();
                this.addEventListener();

                setInterval(() => {
                    if (this.playing) {
                        this.addTilesRow(this.rowTiles);
                        this.removeOldTiles(this.rowTiles);
                    }
                }, 600);
            });

            document.addEventListener('visibilitychange', (evt) => {
                if (evt.target.hidden) {
                    this.pause();
                } else {
                    this.play();
                }

            }, false);
        }

        visibilityChange() {

        }

        removeOldTiles(tiles) {
            if (tiles.length % 25 === 0) {
                const removedTiles = tiles[0];
                let index = 0;

                for (const tile in removedTiles) {
                    if (removedTiles.hasOwnProperty(tile)) {
                        const element = removedTiles[tile];

                        TweenMax.delayedCall(0.07 * index, () => {
                            TweenMax.to(element.scale, .5, {
                                z: 0.01,
                                ease: Power2.easeOut,
                                onComplete: (element) => {
                                    this.groupTiles.remove(element);
                                },
                                onCompleteParams: [element]
                            });
                        });
                        index++;
                    }
                }

                tiles = tiles.splice(0, 1);
            }
        }

        addTilesRow(tiles) {
            const rows = 8;
            const cols = 1;
            const gutter = 1.05;
            const hasPrev = tiles.length && tiles[tiles.length - 1][0].position;
            let positions = [];
            let index = 0;
            let prevPos = 0;

            if (tiles.length) {
                prevPos = tiles[tiles.length - 1][0].position.x + gutter;
            }

            const size = .5;
            const geometry = new THREE.BoxGeometry(size, size, 5);
            const material = new THREE.MeshLambertMaterial({
                color: this.objectsColor,
                emissive: 0x0
            });

            for (let col = 0; col < cols; col++) {
                positions[col] = [];
                tiles.push([]);

                for (let row = 0; row < rows; row++) {
                    const pos = {
                        z: row,
                        y: 3,
                        x: hasPrev ? prevPos : col
                    }

                    positions[col][row] = pos;
                    const plane = this.createObj(this.objectsColor, geometry, material);

                    plane.scale.set(1, 1, 0.01);

                    if (col > 0) {
                        pos.x = (positions[col - 1][row].x * plane.size) + gutter;
                    }

                    if (row > 0) {
                        pos.z = (positions[col][row - 1].z * plane.size) + gutter;
                    }

                    plane.position.set(pos.x, pos.y, pos.z);

                    plane.rotateX(this.radians(90));

                    this.groupTiles.add(plane);

                    TweenMax.delayedCall(0.1 * index, () => {
                        TweenMax.to(plane.children[0].material, .3, {
                            opacity: 1,
                            ease: Power2.easeOut
                        });
                    });

                    tiles[tiles.length - 1].push(plane);

                    index++;
                }

                index++;
            }

            positions = null;
        }


        drawWave() {
            if (this.playing) {
                this.analyser.getByteFrequencyData(this.frequencyData);
                let index = 0;

                for (var i = 0; i < this.rowTiles.length; i++) {
                    for (var j = 0; j < this.rowTiles[i].length; j++) {
                        const freq = this.frequencyData[index];
                        let scale = freq / 50 <= 0 ? 0.01 : freq / 50;

                        TweenMax.to(this.rowTiles[i][j].scale, .2, {
                            z: scale - 3 < 0 ? 0.01 : scale - 3
                        });
                        index++;
                    }
                    index++;
                }
            }
        }


        pause() {
            if (this.audioElement != null) {
                this.audioElement.pause();
            }
        }

        play() {
            this.audioCtx.resume();
            this.audioElement.play();
        }

        createScene() {
            this.renderer = new THREE.WebGLRenderer({ antialias: true });
            console.log('width: ' + canvas.offsetWidth + '  //   height:' + canvas.offsetHeight);
            this.renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);

            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

            this.groupTiles.position.set(10, 0, -5);
            this.scene.add(this.groupTiles);

            canvas.appendChild(this.renderer.domElement);
        }

        addEventListener() {
            /*
            playIntro.addEventListener('click', (evt) => {
                evt.currentTarget.classList.remove('control-show');
                this.play();
            });
            */

            canvas.addEventListener('mouseup', () => {
                requestAnimationFrame(() => {
                    canvas.style.cursor = '-moz-grab';
                    canvas.style.cursor = '-webkit-grab';
                });
            });

            canvas.addEventListener('mousedown', () => {
                requestAnimationFrame(() => {
                    canvas.style.cursor = '-moz-grabbing';
                    canvas.style.cursor = '-webkit-grabbing';
                });
            });

            canvas.addEventListener('keyup', (evt) => {
                if (evt.keyCode === 32 || evt.code === 'Space') {
                    this.playing ? this.pause() : this.play();
                }
            });
        }

        createCamera() {
            this.camera = new THREE.PerspectiveCamera(30, canvas.offsetWidth / canvas.offsetHeight, 1, 1000);
            this.camera.position.set(50, 50, -50);
            this.scene.add(this.camera);
        }

        addCameraControls() {
            this.controls = new OrbitControls(this.camera);
        }

        createObj(color, geometry, material) {
            const obj = new THREE.Mesh(geometry, material);

            obj.castShadow = true;
            obj.receiveShadow = true;
            obj.position.z = -2.5;
            obj.size = 1;
            obj.material.opacity = 0;
            obj.material.transparent = true;

            const pivot = new THREE.Object3D();

            pivot.add(obj);
            pivot.size = 1;

            return pivot;
        }

        onResize() {
            const ww = canvas.offsetWidth;
            const wh = canvas.offsetHeight;

            this.camera.aspect = ww / wh;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(ww, wh);
        }

        addFloor() {
            const planeGeometry = new THREE.PlaneGeometry(250, 250);
            const planeMaterial = new THREE.ShadowMaterial({ opacity: .05 });

            this.floor = new THREE.Mesh(planeGeometry, planeMaterial);

            planeGeometry.rotateX(- Math.PI / 2);

            this.floor.position.y = 0;
            this.floor.receiveShadow = true;

            this.scene.add(this.floor);
        }

        addSpotLight() {
            this.spotLight = new THREE.SpotLight(0xffffff);
            this.spotLight.position.set(-10, 60, -10);
            this.spotLight.castShadow = true;
            this.spotLight.angle = Math.PI / 4;
            this.spotLight.penumbra = 0;
            this.spotLight.decay = .5;
            this.spotLight.distance = 100;
            this.spotLight.shadow.mapSize.width = 1024;
            this.spotLight.shadow.mapSize.height = 1024;
            this.spotLight.shadow.camera.near = 10;
            this.spotLight.shadow.camera.far = 100;

            this.scene.add(this.spotLight);
        }

        addAmbientLight() {
            const light = new THREE.AmbientLight(0xffffff);

            this.scene.add(light);
        }

        animate() {
            this.controls.update();

            if (this.rowTiles[this.rowTiles.length - 1]) {
                const x = -this.rowTiles[this.rowTiles.length - 1][0].position.x + 15;

                TweenMax.to(this.groupTiles.position, 1, {
                    x: x,
                    ease: Power2.easeOut
                });
            }

            this.renderer.render(this.scene, this.camera);

            this.drawWave();

            requestAnimationFrame(this.animate.bind(this));
        }

        radians(degrees) {
            return degrees * Math.PI / 180;
        }
    }

    var app = new App();

    return app;

}


export default Audio3D;