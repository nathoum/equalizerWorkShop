var average = 0.01;
var average2 = 0.01;



window.requestAnimFrame = (function () {
			    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function ( /* function */ callback, /* DOMElement */ element) {
			        window.setTimeout(callback, 1000 / 60);
			    };
			})();      
			//var camera = new THREE.PerspectiveCamera(5, window.innerWidth / window.innerHeight, 1, 9500);
	      	//camera.position.z = 9000; //9000

	      	var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

	      	camera.position.z = 200;
	 
	    	var scene = new THREE.Scene

	    	var nbofsphere = 3;

	    	// renderer
			var renderer = new THREE.WebGLRenderer({antialias:true});
			renderer.setSize(window.innerWidth, window.innerHeight);
			document.body.appendChild(renderer.domElement);



		spheres = [];
		s = [];

		tweens = [];

		controls = new THREE.OrbitControls( camera );


		/******************** BUBBLES METEOR ******************/
		var colorbubbles = new THREE.MeshPhongMaterial({color: 0x2980b9, shading: THREE.FlatShading, fog: false, transparent: true } );

		var groupparticles = new THREE.Object3D();
  		//console.log(groupparticles);
  		 for ( var i = 0; i < 120; i ++ ) {
  		 	var mesh = new THREE.Mesh (new THREE.TetrahedronGeometry(10, 2), colorbubbles);
  		 	mesh.position.x = Math.random() * 400 - 200;
  		 	mesh.position.y = Math.random() * 400 - 200;
  		 	mesh.position.z = Math.random() * 400 - 200;
            mesh.rotation.x = Math.random() * 2 * Math.PI;
            mesh.rotation.y = Math.random() * 2 * Math.PI;

            mesh.scale.set(0.2,0.2,0.2);

            groupparticles.add( mesh );
  		 }

  		scene.add( groupparticles );
  		console.log(groupparticles);

  		for(var i in groupparticles.children) {
  			groupparticles.children[i].material.opacity = 0;
  		}

  		/******************** BUBBLES METEOR ******************/


		/*** ATOME EFFET PHONG ***/
		var golf = new THREE.MeshPhongMaterial({color: 0xffffff, shading: THREE.FlatShading, fog: false, transparent: true } )
		var golfsmallleft = new THREE.MeshPhongMaterial({color: 0xffffff, shading: THREE.FlatShading, fog: false,  transparent: true  } )
		var golfsmallright = new THREE.MeshPhongMaterial({color: 0xffffff, shading: THREE.FlatShading, fog: false,  transparent: true  } )
		var golfsmallbottom = new THREE.MeshPhongMaterial({color: 0xffffff, shading: THREE.FlatShading, fog: false,  transparent: true  } )

		//L1 = new THREE.PointLight(0xc0392b, 1);
		L1 = new THREE.PointLight(0x16a085, 1);
		L1.position.x = 2000
		L1.position.y = 1000
		L1.position.z = 2000
		scene.add(L1);

		//L3 = new THREE.PointLight(0xecf0f1, .4);
		L3 = new THREE.PointLight(0xecf0f1, .4);
		L3.position.z = 400
		scene.add(L3);

		var size = 500, step = 100;

		var geometry = new THREE.Geometry();



		var dot = new THREE.Mesh (new THREE.TetrahedronGeometry(10, 2), golf);
		 scene.add(dot);

		 dot.scale.set(2,2,2);
		 /*dot.material.opacity = 0;
		 dot.transparent = true;
		 dot.material.needsUpdate = true;
		 dot.geometry.verticesNeedUpdate = true;*/

		 console.log(dot.material);
		 		 

		 dot.material.opacity = 0;
		 dot.material.opacity.needsUpdate = true;

		 /********************/

		var cloneright = new THREE.Mesh(new THREE.TetrahedronGeometry(10, 2), golfsmallright);
		scene.add( cloneright );
		cloneright.position.x += 50;
		cloneright.position.y = 50;

		//Clone left
		var cloneleft = new THREE.Mesh(new THREE.TetrahedronGeometry(10, 2), golfsmallleft);
		scene.add( cloneleft );
		cloneleft.position.x += -50;
		cloneleft.position.y = 50;

		var clonebottom = new THREE.Mesh(new THREE.TetrahedronGeometry(10, 2), golfsmallbottom);
		scene.add( clonebottom );
		clonebottom.position.y = -60;

		cloneright.material.opacity = 0;
		cloneright.material.opacity.needsUpdate = true;

		cloneleft.material.opacity = 0;
		cloneleft.material.opacity.needsUpdate = true;

		clonebottom.material.opacity = 0;
		clonebottom.material.opacity.needsUpdate = true;




		/****** segments *******/
		//SEGMENT LEFT
		var linematerialleft = new THREE.LineBasicMaterial({
		color: 0xecf0f1,
		transparent: true
		});

		var linematerialright = new THREE.LineBasicMaterial({
		color: 0xecf0f1,
		transparent: true
		});
		var linematerialbottom = new THREE.LineBasicMaterial({
		color: 0xecf0f1,
		transparent: true
		});



		var linegeometry = new THREE.Geometry();
		linegeometry.vertices.push(cloneleft.position, dot.position
		);

		var lineright = new THREE.Line( linegeometry, linematerialright );
		lineright.material.linewidth = 2;
		scene.add( lineright );

		//SEGMENT RIGHT

		var lineleftgeometry = new THREE.Geometry();
		lineleftgeometry.vertices.push(cloneright.position, dot.position
		);

		var lineleft = new THREE.Line( lineleftgeometry, linematerialleft );
		lineleft.material.linewidth = 2;
		scene.add( lineleft );

		//BOTTOM LINE
		var linebottomgeometry = new THREE.Geometry();
		linebottomgeometry.vertices.push(clonebottom.position, dot.position
		);

		var linebottom = new THREE.Line( linebottomgeometry, linematerialbottom );
		linebottom.material.linewidth = 2;
		scene.add( linebottom );

		lineleft.material.opacity = 0;
		lineleft.material.opacity.needsUpdate = true;
		lineright.material.opacity = 0;
		lineright.material.opacity.needsUpdate = true;
		linebottom.material.opacity = 0;
		linebottom.material.opacity.needsUpdate = true;

		//********************

		var groupobject = new THREE.Object3D();//create an empty container
		//groupobject.add( dot );//add a mesh with geometry to it
		groupobject.add( dot );//add a mesh with geometry to it
		groupobject.add( clonebottom );
		groupobject.add( cloneright );
		groupobject.add( cloneleft );
		groupobject.add( lineleft );
		groupobject.add( lineright );
		groupobject.add( linebottom );

		scene.add( groupobject );//when done, add the group to the scene
		//*********************


	    var tickaverageval = 0.01;
	 
	animate();
	function animate() {

	    requestAnimationFrame(animate);	    


	    var averageval = (average2/1000);
	    var average1val = (average/1000);

	    tickaverageval += (averageval*10); //nouvelle valeur incrémente au tick

	    //Sin() pour faire effet bounce/vibration
	    linebottom.position.x += Math.sin(tickaverageval) * 0.2
	    lineleft.position.x += Math.sin(tickaverageval) * 0.2
	    lineright.position.x += Math.sin(tickaverageval) * 0.2

	    dot.rotation.x += Math.max(averageval, 0.01)
	    dot.rotation.y += Math.max(average1val, 0.01)
  		cloneright.rotation.x += Math.max(averageval, 0.01)
  		cloneright.rotation.y += Math.max(average1val, 0.01)

  		cloneleft.rotation.x += Math.max(averageval, 0.01)
  		cloneleft.rotation.y += Math.max(average1val, 0.01)

  		clonebottom.rotation.x += Math.max(averageval, 0.01)
  		clonebottom.rotation.y += Math.max(average1val, 0.01)

  		groupobject.rotation.z += 0.01

  		groupparticles.rotation.x += 0.01
  		groupparticles.rotation.y += 0.01

  		//console.log(average);

  		if(average <= 40) {

  			for(var i in groupparticles.children) {
	  			groupparticles.children[i].material.color.setHex( 0x3498db)
	  		}

  		} else {

  			for(var i in groupparticles.children) {
  				
  				groupparticles.children[i].material.color.setHex(0xe74c3c)

	  		}
  		}





	    
	    renderer.render(scene, camera);

	   ;
	}



	//***************** AUDIO ***************//

	//**************************************//




	document.addEventListener("keydown", keydown );

	function keydown(e) {

		//console.log( e.keyCode );
		//console.log("keycode");

		switch( e.keyCode ) {
			case 13: // ENTER
	            lineleft.position.z -= 1;
	            console.log( "position.z:", lineleft.position.z);
	        break; 
	        case 32: // SPACE
	            lineleft.position.z += 1;
	            console.log( "position.z:", lineleft.position.z);
	        break;
	        case 38: // UP
	            lineleft.position.y += 1;
	            console.log( "position.y:", lineleft.position.y);
	        break; 
	        case 40: // DOWN
	            lineleft.position.y -= 1;
	            console.log( "position.y:", lineleft.position.y);
	        break;
	        case 37: // LEFT
	            lineleft.position.x -= 1;
	            console.log( "position.x:", lineleft.position.x);
	        break; 
	        case 39: // RIGHT
	            lineleft.position.x += 1;
	            console.log( "position.x:", lineleft.position.x);
	        break;
	        case 65: // A
	            lineleft.rotation.z -= 1;
	            console.log( "rotation.z:", lineleft.rotation.z);
	        break; 
	        case 69: // E
	            lineleft.rotation.z += 1;
	            console.log( "rotation.z:", lineleft.rotation.z);
	        break;
	        case 90: // Z
	            lineleft.rotation.y -= 1;
	            console.log( "rotation.y:", lineleft.rotation.y);
	        break; 
	        case 83: // S
	            lineleft.rotation.y += 1;
	            console.log( "rotation.y:", lineleft.rotation.y);
	        break;
	        case 81: // Q
	            lineleft.rotation.x -= 1;
	            console.log( "rotation.x:", lineleft.rotation.x);
	        break; 
	        case 68: // D
	            lineleft.rotation.x += 1;
	            console.log( "rotation.x:", lineleft.rotation.x);
	        break;
	    }

	}

	//********************** AUDIO ********
	// creation of the audio context
    if (! window.AudioContext) {
        if (! window.webkitAudioContext) {
            alert('no audiocontext found');
        }
        window.AudioContext = window.webkitAudioContext;
    }
    var context = new AudioContext();
    var audioBuffer;
    var sourceNode;
    var splitter;
    var analyser, analyser2;
    var javascriptNode;

    

    // load the sound
    setupAudioNodes();
    //loadSound("http://www.twin-dev.net/experiments/audio/breakingbad-song.mp3");
    //loadSound("./ressources/breakingbad-song.mp3");

    function setupAudioNodes() {

        // setup a javascript node
        javascriptNode = context.createScriptProcessor(2048, 1, 1);
        // connect to destination, else it isn't called
        javascriptNode.connect(context.destination);


        // setup : analyzer
        analyser = context.createAnalyser();
        analyser.smoothingTimeConstant = 0.3;
        analyser.fftSize = 1024;

        analyser2 = context.createAnalyser();
        analyser2.smoothingTimeConstant = 0.0;
        analyser2.fftSize = 1024;

        // creation of a buffer source node
        sourceNode = context.createBufferSource();
        splitter = context.createChannelSplitter();

        // connect the source to the analyser and the splitter
        sourceNode.connect(splitter);

        // connect one of the outputs from the splitter to
        // the analyser
        splitter.connect(analyser,0,0);
        splitter.connect(analyser2,1,0);

        // connect the splitter to the javascriptnode
        analyser.connect(javascriptNode);

        // connect to destination
        sourceNode.connect(context.destination);
    }

    // load the specified sound
    function loadSound(url) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';

        // When loaded decode the data
        request.onload = function() {

            // decode the data
            context.decodeAudioData(request.response, function(buffer) {
                // when the audio is decoded play the sound
                playSound(buffer);
            }, onError);
        }
        request.send();
    }


    function playSound(buffer) {
        sourceNode.buffer = buffer;
        sourceNode.start(0);
        sourceNode.onended = onEnded;

    }

    function onEnded() {
	    console.log('playback finished');
	    var soundavg = 0;

	    console.log("music ended");
	    $(".container-end").fadeIn();
	}

    // log if an error occurs
    function onError(e) {
        console.log(e);
    }

    // quand le noeud javascript est appelé on utilise l'information de l'analyseur pour se servir des données de volume
    javascriptNode.onaudioprocess = function() {

        // get the average for the first channel
        var array =  new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        average = getAverageVolume(array);

        // get the average for the second channel
        var array2 =  new Uint8Array(analyser2.frequencyBinCount);
        analyser2.getByteFrequencyData(array2);
        average2 = getAverageVolume(array2);


    }

    function getAverageVolume(array) {
        var values = 0;

        var length = array.length;

        // get all the frequency amplitudes
        for (var i = 0; i < length; i++) {
            values += array[i];
        }

        average = values / length;
        return average;
    }

    function replayExperiment() {
    	$( ".container-end-replay" ).click(function(e) {
    document.location.reload(true);

    	});
    	
    }
    replayExperiment();


    /********************* ANIMATIONS **************/


    //TweenLite.to($(".content-text-title1"), 1.5, {width:100, delay:0.5, onComplete:myFunction});

    TweenLite.from($(".content-text-title1"), 1.0, {scaleX:0, scaleY:0, ease:Power3.easeOut, delay:1.5, onComplete:titleHasAppeared});
	function titleHasAppeared() {
		//TweenMax.to(dot.material, 0.5, { opacity: 1, onComplete:firstSmallMeteor});
		TweenMax.to(dot.material, 0.5, { opacity: 1, onComplete:firstSmallMeteor});
	
	}

	function firstSmallMeteor() {

		TweenMax.to(cloneleft.material, 0.5, { opacity: 1, onComplete:secondSmallMeteor});

	}

	function secondSmallMeteor() {

		TweenMax.to(cloneright.material, 0.5, { opacity: 1, onComplete:thirdSmallMeteor});

	}

	function thirdSmallMeteor() {

		TweenMax.to(clonebottom.material, 0.5, { opacity: 1, onComplete:firstLine});

	}

	function firstLine() {

		TweenMax.to(lineleft.material, 0.5, { opacity: 1, onComplete:secondLine});

	}

	function secondLine() {

		TweenMax.to(lineright.material, 0.5, { opacity: 1, onComplete:thirdLine});
		loadSound("./ressources/breakingbad-song.mp3");

	}

	function thirdLine() {

		TweenMax.to(linebottom.material, 0.5, { opacity: 1, onComplete:displayparticules});
		//loadSound("./ressources/breakingbad-song.mp3");

	}

	function displayparticules() {

		for(var i in groupparticles.children) {
  			TweenMax.to(groupparticles.children[i].material, 0.5, { opacity: 1});
  		}

		/*for(var i in groupparticles.children) {
			TweenMax.to(groupparticles[i].material, 0.5, { opacity: 1, onComplete:startMusic});
		}*/

		
		// load the sound
	    //setupAudioNodes();
	    //loadSound("http://www.twin-dev.net/experiments/audio/breakingbad-song.mp3");
	    //loadSound("./ressources/breakingbad-song.mp3");
	}




