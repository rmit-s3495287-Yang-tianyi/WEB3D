var scene;
var camera;
var renderer;
var max_Range=0;
var min_Range=- Math.PI/2;
var wireframew=0;
var joint1;
var isFront=false;
var isRight=false;
var targer_Joint="Hip";
var material;
var eyematerial;
var bool_light=true;
var bool_axes=true;
var axes_num=0;
var body;
var bnum=0;
var toesnum=0;
init();



var light  = new THREE.DirectionalLight(0xffffff);

light.position.set(1, 1, 1);
var evlight  = new THREE.AmbientLight(0x404040);


material = new THREE.MeshLambertMaterial({side:THREE.DoubleSide,color : 0x00ff00});
material1 = new THREE.MeshBasicMaterial({side:THREE.DoubleSide,color : 0xff9966});
eyematerial = new THREE.MeshLambertMaterial({side:THREE.DoubleSide,color : 0x000000});
material.needsUpdate=true;
var frog=createJoint(frog);

frog.add(createFrog(material));
scene.add(light);
scene.add(evlight);


scene.add(frog);

scene.add(createWater());

scene.add(createAxes(5));
var vector = new THREE.Vector3();
	
renderer.render(scene, camera); 
var controls = new THREE.TrackballControls(camera);
controls.addEventListener('change', render);
animate();

document.onkeydown = handleKeyDown;

function handleKeyDown(event)
{	var a;
 	var b=scene.getObjectByName("tbody");
 	
		if(isFront)
		{
			if(isRight){
				a=scene.getObjectByName( "F"+"R"+targer_Joint,true );
			}
			else
			{
				a=scene.getObjectByName( "F"+"L"+targer_Joint,true );
			}
		}
		else
		{
			if(isRight){
				a=scene.getObjectByName( "R"+"R"+targer_Joint,true );
			}
			else{
				a=scene.getObjectByName( "R"+"L"+targer_Joint,true );
			}
		}
    switch (event.keyCode) {
    case 77:
			
		
        if(wireframew==0){
			if(bool_light==true){
				b.material=material;
				for (var i = 0; i <bnum; i++) {
				var c;
				c=scene.getObjectByName("limb"+i);
				c.material=material;
			}
			for (var i = 0; i <toesnum; i++) {
				var d;
				d=scene.getObjectByName("toes"+i);
				d.material=material;
			}
			}else{
				b.material=material1;
				for (var i = 0; i <bnum; i++) {
				var c;
				c=scene.getObjectByName("limb"+i);
				c.material=material1;
			}
			for (var i = 0; i <toesnum; i++) {
				var d;
				d=scene.getObjectByName("toes"+i);
				d.material=material1;
				}
			}
			wireframew=1;
			material.wireframe=true;
			material1.wireframe=true;
			eyematerial.wireframe=true;
			
			b.material.map=null;
			
			
			
		}else{
			if(bool_light==true){
				b.material=new THREE.MeshLambertMaterial({side:THREE.DoubleSide});
				for (var i = 0; i <bnum; i++) {
				var c;
				c=scene.getObjectByName("limb"+i);
				c.material=material;
			}
			for (var i = 0; i <toesnum; i++) {
				var d;
				d=scene.getObjectByName("toes"+i);
				d.material=material;
			}
			}else{
				b.material=new THREE.MeshBasicMaterial({side:THREE.DoubleSide});
				for (var i = 0; i <bnum; i++) {
				var c;
				c=scene.getObjectByName("limb"+i);
				c.material=material1;
			}
			for (var i = 0; i <toesnum; i++) {
				var d;
				d=scene.getObjectByName("toes"+i);
				d.material=material1;
				}
			}
			wireframew=0;
			material.wireframe=false;
			material1.wireframe=false;
			eyematerial.wireframe=false;
			
			b.material.map=new THREE.TextureLoader().load("penta.png");
			
		}
        break;
    case 72:
		
		targer_Joint="Hip";
        max_Range=0;
		min_Range=- Math.PI/2 ;
        break;
    case 75:
		targer_Joint="Knee";
        max_Range= Math.PI;
		min_Range= -Math.PI;

        break;
    case 65:
		
		targer_Joint="Ankle";
        max_Range= Math.PI;
		min_Range= -Math.PI;
        break;
    case 84:
		targer_Joint="Tmt";
        max_Range= Math.PI/2;
		min_Range= -Math.PI/2;

        break;
	case 38:
        isFront=true;
        break;
    case 40:
        isFront=false;
        break;
	case 39:
        isRight=true;
        break;
    case 37:
        isRight=false;
        break;
	case 187:
		if(a.rotation.z<max_Range){
			a.rotation.z+= 1 * Math.PI / 180;
		}
		console.log(a.rotation.z);
	break;
	case 189:
	
		if(a.rotation.z>min_Range){
			a.rotation.z-= 1 * Math.PI / 180;
		}
	break;
    case 76:
        if(bool_light==true){
			bool_light = false;
			scene.remove(evlight);
			light.visible = false;
			if(wireframew==1){
				b.material=new THREE.MeshBasicMaterial({side:THREE.DoubleSide,wireframe:true,color:0xff9966});
				
			}else{
				b.material=new THREE.MeshBasicMaterial({side:THREE.DoubleSide});
				
			}
			b.material.map= new THREE.TextureLoader().load("penta.png");
			for (var i = 0; i <bnum; i++) {
				var c;
				c=scene.getObjectByName("limb"+i);
				c.material=material1;
			}
			for (var i = 0; i <toesnum; i++) {
				var d;
				d=scene.getObjectByName("toes"+i);
				d.material=material1;
			}
		}else{
			bool_light = true;
			scene.add(evlight);
			light.visible = true;
			if(wireframew==1){
				b.material=new THREE.MeshLambertMaterial({side:THREE.DoubleSide,wireframe:true});
			}else{
				b.material=new THREE.MeshLambertMaterial({side:THREE.DoubleSide});
			}
			
			b.material.map= new THREE.TextureLoader().load("penta.png");
			for (var i = 0; i <bnum; i++) {
				var c;
				c=scene.getObjectByName("limb"+i);
				c.material=material;
			}
			for (var i = 0; i <toesnum; i++) {
				var d;
				d=scene.getObjectByName("toes"+i);
				d.material=material;
			}
		}
        break;

        case 88:
        if(bool_axes==true){
			bool_axes = false;
		}else{
			bool_axes = true;
		}
		hideAxes();
        break;
    }
    
    
}
function hideAxes() {
	//get all axes' name
	for (var i = 0; i <axes_num; i++) {
		var axe;
		axe=scene.getObjectByName("axes"+i);
		if (bool_axes==false) {	
			axe.visible=false;
		}
		else{
			axe.visible=true;
		}
	}
}
function init(){
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000); 
	camera.position.z = 2;
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(0x404040, 1);
	document.body.appendChild(renderer.domElement); 
}
function render() {
    renderer.render(scene, camera); 
}
function animate() {
    render();
    requestAnimationFrame(animate);
    controls.update();
}

  function createJoint(name){
	  name=new THREE.Object3D;
	  name.add(createAxes(0.5));
	  return name;
  }
function createAxes(length){
  var geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3(0, 0, 0));
  geometry.vertices.push(new THREE.Vector3(length, 0, 0));
  geometry.vertices.push(new THREE.Vector3(0, 0, 0));
  geometry.vertices.push(new THREE.Vector3(0, length, 0));
  geometry.vertices.push(new THREE.Vector3(0, 0, 0));
  geometry.vertices.push(new THREE.Vector3(0, 0, length));
  geometry.colors.push(new THREE.Color(0xff0000));
  geometry.colors.push(new THREE.Color(0xff0000));
  geometry.colors.push(new THREE.Color(0x00ff00));
  geometry.colors.push(new THREE.Color(0x00ff00));
  geometry.colors.push(new THREE.Color(0x0000ff));
  geometry.colors.push(new THREE.Color(0x0000ff));
  var material = new THREE.LineBasicMaterial();
  material.vertexColors = THREE.VertexColors;
  var axes = new THREE.LineSegments(geometry, material);
  axes.name = "axes"+axes_num;
  if (bool_axes) {
  	axes.visible=true;
  }
  else
  {
  	axes.visible=false;
  }
  axes_num++;

  return axes;
}

 function createPentagonalBipyramid(material){
	var geometry = new THREE.Geometry();
	geometry.vertices.push(new THREE.Vector3(0,0.5,0));
	geometry.vertices.push(new THREE.Vector3(0.8,0,-0.58));
	geometry.vertices.push(new THREE.Vector3(0.8,0,0.58));
	geometry.vertices.push(new THREE.Vector3(-0.3,0,0.95));
	geometry.vertices.push(new THREE.Vector3(-1,0,0));
	geometry.vertices.push(new THREE.Vector3(-0.3,0,-0.95));
	geometry.vertices.push(new THREE.Vector3(0,-0.5,0));
	geometry.faces.push(new THREE.Face3(0, 1, 2));
	geometry.faces.push(new THREE.Face3(0,2,3));
	geometry.faces.push(new THREE.Face3(0,3,4));
	geometry.faces.push(new THREE.Face3(0,4,5));
	geometry.faces.push(new THREE.Face3(0,5,1));
	geometry.faces.push(new THREE.Face3(6, 1, 2));
	geometry.faces.push(new THREE.Face3(6,2,3));
	geometry.faces.push(new THREE.Face3(6,3,4));
	geometry.faces.push(new THREE.Face3(6,4,5));
	geometry.faces.push(new THREE.Face3(6,5,1));
	
	 //texture
	var UVs = [ 
    new THREE.Vector2(0.5,0.5), 
  
    new THREE.Vector2(0.91,0.8), 
    new THREE.Vector2(0.91,0.2),
	new THREE.Vector2(0.35,0.02),
	new THREE.Vector2(0,0.5),
	new THREE.Vector2(0.35,0.98)
];

	geometry.faceVertexUvs[0][0] = [UVs[0], UVs[1], UVs[2]];
	geometry.faceVertexUvs[0][1] = [UVs[0], UVs[2], UVs[3]];
	geometry.faceVertexUvs[0][2] = [UVs[0], UVs[3], UVs[4]];
	geometry.faceVertexUvs[0][3] = [UVs[0], UVs[4], UVs[5]];
	geometry.faceVertexUvs[0][4] = [UVs[0], UVs[5], UVs[1]];
	 
	geometry.faceVertexUvs[0][5] = [UVs[0], UVs[1], UVs[2]];
	geometry.faceVertexUvs[0][6] = [UVs[0], UVs[2], UVs[3]];
	geometry.faceVertexUvs[0][7] = [UVs[0], UVs[3], UVs[4]];
	geometry.faceVertexUvs[0][8] = [UVs[0], UVs[4], UVs[5]];
	geometry.faceVertexUvs[0][9] = [UVs[0], UVs[5], UVs[1]];
	 
	geometry.computeFaceNormals();
	material = new THREE.MeshLambertMaterial({side:THREE.DoubleSide,color : 0xffffff});
	var object = new THREE.Mesh(geometry, material);
	
	var loader = new THREE.TextureLoader();
	var texture = loader.load("penta.png");

 	object.material.map = texture;
	object.name="tbody";
	object.add(createAxes(0.5));
	return object;
}

function createSquareBipyramid( material){
	var geometry = new THREE.Geometry();
	geometry.vertices.push(new THREE.Vector3(0.5, 0, 0));
	geometry.vertices.push(new THREE.Vector3(0, 0.25, 0));
	geometry.vertices.push(new THREE.Vector3(0, 0, 0.25));
	
	geometry.vertices.push(new THREE.Vector3(-0.5, 0, 0));
	geometry.vertices.push(new THREE.Vector3(0, -0.25, 0));
	geometry.vertices.push(new THREE.Vector3(0, 0, -0.25));
	
	
	geometry.faces.push(new THREE.Face3(0, 1, 2));
	geometry.faces.push(new THREE.Face3(3, 2, 1));
	geometry.faces.push(new THREE.Face3(0, 5, 1));
	geometry.faces.push(new THREE.Face3(3, 1, 5));
	geometry.faces.push(new THREE.Face3(0, 2, 4));
	geometry.faces.push(new THREE.Face3(3, 4, 2));
	geometry.faces.push(new THREE.Face3(0, 4, 5));
	geometry.faces.push(new THREE.Face3(3, 5, 4));
	
	geometry.computeFaceNormals();
	
	var object = new THREE.Mesh(geometry, material); 
	var axes=createAxes(0.5);
	object.name = "limb"+bnum;
	bnum++;
	object.add(axes);
	return object;
          
}

function createHead(material){
	var head=createSquareBipyramid( material);
	
	var leye=createEye(0.1, 0.1, 0.1, eyematerial);
	var reye=createEye(0.1, 0.1, 0.1, eyematerial);
	leye.position.x=0.125;
	reye.position.x=0.125;
	leye.position.y=0;
	reye.position.y=0;
	leye.position.z=-0.2;
	reye.position.z=0.2;
	
	head.position.x=1.225;
	head.position.y=0.225;
	head.rotation.z=0.5;
	
	head.add(leye);
	head.add(reye);
	return head;
}

function createTorso(material){
	joint1 = new THREE.Object3D();
	var ltarm=createSquareBipyramid( material);
	var lbarm=createSquareBipyramid( material);
	var ltoes=createToes(material);
	joint1.add(ltarm);
	ltarm.add(lbarm);
	lbarm.add(ltoes);
	joint1.position.x=0.8;
	joint1.rotation.z=-Math.PI / 4;
	lbarm.position.x=1;
	lbarm.rotation.z=Math.PI / 4;
	ltoes.position.x=1;
	
	return joint1;
 }
function createFLeg(x,y,z,material)
{

	var hip;
	hip=createJoint(hip);
	var knee;
	knee=createJoint(knee);
	var ankle;
	ankle=createJoint(ankle);

	if (z>0)
	{
		hip.name="FRHip"
		knee.name="FRKnee";
		ankle.name="FRAnkle";
	}
	else
	{
		hip.name="FLHip"
		knee.name="FLKnee";
		ankle.name="FLAnkle";
	}
	
	
	var upLeg;
	upLeg=createSquareBipyramid( material);
	var lowLeg;
	lowLeg=createSquareBipyramid( material);
	var toes;
	toes=createToes(material);
	
	hip.add(upLeg);
	hip.add(knee);
	
	knee.add(lowLeg);
	knee.add(ankle);
	
	ankle.add(toes);
	
	
	
	hip.position.x= x;
	hip.position.y= y;
	hip.position.z= z;
	hip.rotation.z= -1.575;
	
	
	upLeg.position.x=0.5;
	knee.position.x=1;
	knee.rotation.z=1.575;
	lowLeg.position.x=0.5;
	
	ankle.position.x=1;
	
	toes.position.x=0;
	
	return hip;
	
}
function createLeg(end,material, isleft)
{
	var rightAdjust;
	if(isleft){
		rightAdjust=1;
	}
	else
	{
		rightAdjust=-1;
	}
	var hip;
	hip=createJoint(hip);

	var knee;
	knee=createJoint(knee);


	var ankle;
	ankle=createJoint(ankle);
	var tmt;
	tmt=createJoint(tmt);
	if (isleft==false)
	{
		hip.name="RRHip"
		knee.name="RRKnee";
		ankle.name="RRAnkle";
		tmt.name="RRTmt";
	}
	else
	{
		hip.name="RLHip"
		knee.name="RLKnee";
		ankle.name="RLAnkle";
		tmt.name="RLTmt";
	}
	
	var upLeg;
	upLeg=createSquareBipyramid( material);
	var lowLeg;
	lowLeg=createSquareBipyramid( material);
	var foot;
	foot=createSquareBipyramid( material);
	var toes;
	toes=createToes(material);
	toes.material.side = THREE.DoubleSide;
	//add limbs to joint
	hip.add(upLeg);
	hip.add(knee);
	
	knee.add(lowLeg);
	knee.add(ankle);
	
	ankle.add(foot);
	ankle.add(tmt);
	
	tmt.add(toes);
	
	
	hip.rotation.y= rightAdjust*1.575;
	hip.position.x= end;
	upLeg.position.x=0.5;
	
	knee.position.x=1;
	knee.rotation.z=-2.214;
	lowLeg.position.x=0.5;
	
	ankle.position.x=1;
	ankle.rotation.z=2.214;
	foot.position.x=0.5;
	
	tmt.position.x=1;
	tmt.rotation.y=rightAdjust*-1.575;
	toes.position.x=0;
	
	return hip;
	
}
function createEye(sizeX, sizeY, sizeZ, material){
	var geometry = new THREE.Geometry();
	geometry.vertices.push(new THREE.Vector3(sizeX ,sizeY ,0));
	geometry.vertices.push(new THREE.Vector3(sizeX, 0 ,-sizeZ));
	geometry.vertices.push(new THREE.Vector3(1*sizeX*2 ,0 ,0));
	geometry.vertices.push(new THREE.Vector3( sizeX ,0 ,sizeZ));
	geometry.vertices.push(new THREE.Vector3( 0 ,0, 0));
	geometry.vertices.push(new THREE.Vector3( sizeX ,-sizeY, 0));
    geometry.faces.push(new THREE.Face3(0, 1, 2));
	geometry.faces.push(new THREE.Face3(0, 2,3));
	geometry.faces.push(new THREE.Face3(0, 3,4));
	geometry.faces.push(new THREE.Face3(0, 4,1));
	geometry.faces.push(new THREE.Face3(5, 2, 1));
	geometry.faces.push(new THREE.Face3(5, 3,2));
	geometry.faces.push(new THREE.Face3(5, 4,3));
	geometry.faces.push(new THREE.Face3(5, 1,4));
	geometry.computeFaceNormals();
	var object = new THREE.Mesh(geometry, material); 
	object.position.x=0.75;
	return object;
          
}

function createToes(material){
	var geometry = new THREE.Geometry();
	geometry.vertices.push(new THREE.Vector3(0,0 ,0));
	geometry.vertices.push(new THREE.Vector3(0.5, 0 ,-0.25));
	geometry.vertices.push(new THREE.Vector3(0.5, 0 ,0.25));
	geometry.faces.push(new THREE.Face3(0,1,2));
	
	geometry.computeFaceNormals();
	
	var object = new THREE.Mesh(geometry, material); 
	var axes=createAxes(0.5);
	object.add(axes);
	object.name="toes"+toesnum;
	toesnum++;
	return object;
}

function createWater(){
	var geometry = new THREE.Geometry();
	geometry.vertices.push(new THREE.Vector3(-5,-0.5 ,2));
	geometry.vertices.push(new THREE.Vector3(5, -0.5 ,2));
	geometry.vertices.push(new THREE.Vector3(5, -0.5 ,-2));
	geometry.vertices.push(new THREE.Vector3(-5, -0.5 ,-2));
	geometry.faces.push(new THREE.Face3(0,1,2));
	geometry.faces.push(new THREE.Face3(2,3,0));
	geometry.computeFaceNormals();
	var m= new THREE.MeshLambertMaterial({side:THREE.DoubleSide,color : 0x0000CD});
	var object = new THREE.Mesh(geometry, m); 
	return object;
}
function createFrog(material){
	
	
	body=createPentagonalBipyramid(material);
	var head=createHead(material);
	
	var FLHip=createFLeg(0.8,0,-0.58,material);
	var FRHip=createFLeg(0.8,0,0.58,material);
	
	var RRHip=createLeg(-1, material, false);
	var RLHip=createLeg(-1, material, true);
	
	body.add(head);
	body.add(FRHip);
	body.add(FLHip);


	body.add(RRHip);
	body.add(RLHip);
	
	body.position.y=1;
	
	return body;

}





