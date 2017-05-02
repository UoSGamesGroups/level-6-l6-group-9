#pragma strict

var player:GameObject;

var lookhorz:float;
var lookvert:float;

var riseval:float;

var lookspeed:float;

var lean:float;
var leandir:Vector3;

function Start () {

}

function Update () {

	//Mouselooking
	lookhorz = Input.GetAxisRaw("Mouse X");
	lookvert = Input.GetAxisRaw("Mouse Y");
	
	//Looking
	transform.Rotate(0, lookhorz * Time.deltaTime * lookspeed, 0);
	transform.Rotate(-lookvert * Time.deltaTime * lookspeed, 0, 0);
	
	transform.eulerAngles.z = 0 + lean;
	
	transform.position = player.transform.position - leandir;
	
	//transform.position.y = player.transform.localScale.y;
	transform.position.y = player.transform.position.y + player.transform.localScale.y/2;
}

function LeanLeft () {
	
	leandir = -player.transform.right * 0.8;
	
	if (lean > -25)
	{
		lean -= 100 * Time.deltaTime;
	}else
	{
		lean = -25;
	}
	
}

function LeanRight () {
	
	leandir = player.transform.right * 0.8;
	
	if (lean < 25)
	{
		lean += 100 * Time.deltaTime;
	}else
	{
		lean = 25;
	}
	
}

function LeanClear () {
	
	lean = 0;
	leandir = Vector3.zero;
	
}