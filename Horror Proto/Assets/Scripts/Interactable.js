#pragma strict

var enemy : GameObject;

function Start () {

	enemy = GameObject.FindGameObjectWithTag("Enemy");

}

function Update () {

}

function OnCollisionEnter () {
	
	if (GetComponent.<Rigidbody>().velocity.magnitude > 2)
	{
		enemy.SendMessage("NoiseHeard", transform.position);
		GetComponent(AudioSource).Play();
		print ("Noise Made");
	}
		
	//print (GetComponent.<Rigidbody>().velocity.magnitude);
	
}