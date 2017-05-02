#pragma strict

var xr:boolean;
var yr:boolean;
var zr:boolean;

var custr:boolean;

function Start () {

	if (xr)
	{
		transform.eulerAngles.x = Random.Range(0,360);
	}	
	
	if (yr)
	{
		transform.eulerAngles.y = Random.Range(0,360);
	}	
	
	if (zr)
	{
		transform.eulerAngles.z = Random.Range(0,360);
	}	
	
	if (custr)
	{
		if (Random.value < 0.2)
		{
			transform.eulerAngles.y = Random.Range(0,360);
			transform.eulerAngles.z = Random.Range(0,360);
		}
	}

}

function Update () {

}