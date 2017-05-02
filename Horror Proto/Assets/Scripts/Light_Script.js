#pragma strict

var enemy : GameObject;

var mats : Material[];

function Start () {

	enemy = GameObject.FindWithTag("Enemy");

}

function Update () {

	//Get Enemy, if near disable children (Lights)
	if (Vector3.Distance(transform.position, enemy.transform.position) < 8)
	{
		gameObject.transform.GetChild(0).gameObject.SetActive(false);
		gameObject.transform.GetChild(1).gameObject.SetActive(false);
		GetComponent(Renderer).material = mats[1];
	}else
	{
		gameObject.transform.GetChild(0).gameObject.SetActive(true);
		gameObject.transform.GetChild(1).gameObject.SetActive(true);
		GetComponent(Renderer).material = mats[0];
	}
	
}

//Possibly try having this run on the enemy script using a list of lights if performance becomes an issue?