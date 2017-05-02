#pragma strict

var amount : float;

function Start () {
	
}

function Update () {
	
	RenderSettings.ambientLight = Color(0.1 * amount, 0.1 * amount, 0.1 * amount, 1);
	
	if (amount < 0) {
		
		amount = 0;
		
	}
	
	if (amount > 10) {
		
		amount = 10;
		
	}
	
}
