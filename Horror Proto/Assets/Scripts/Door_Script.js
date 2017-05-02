#pragma strict

var door : AudioClip;

var hasopened : boolean;

function Start () {

}

function Update () {

}

function OnCollisionEnter () {
	
	if (hasopened == false)
	{
		GetComponent(AudioSource).PlayOneShot(door);
		hasopened = true;
	}

}