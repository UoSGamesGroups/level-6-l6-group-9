#pragma strict

var randomtimer : float;
var maxr : float;
var minr : float;

function Start () {

}

function Update () {

	if (!GetComponent(AudioSource).isPlaying) {

		if (randomtimer > 0)
		{
			randomtimer -= 1 * Time.deltaTime;
		}else
		{
			GetComponent(AudioSource).Play();
			randomtimer = Random.Range(minr, maxr);
		}
		
	}
	
}