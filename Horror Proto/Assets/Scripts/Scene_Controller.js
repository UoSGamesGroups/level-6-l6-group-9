#pragma strict

var mouseshow: boolean;

function Start () {

}

function Update () {
	
	//Toggling mouse hide on and off
	if (mouseshow){
		Cursor.visible = true;
		Cursor.lockState = CursorLockMode.None;
		
	}else{
		Cursor.visible = false;
		Cursor.lockState = CursorLockMode.Locked;
		
	}
	
	if(Input.GetKeyDown(KeyCode.Escape)){
		if (mouseshow){
			mouseshow = false;
		}else{
			mouseshow = true;
		}
	}	
	
	if(Input.GetKeyDown(KeyCode.Escape))
	{
		Application.Quit();
	}
	
	//Reset
	if(Input.GetKeyDown(KeyCode.R))
	{
		SceneManagement.SceneManager.LoadScene(SceneManagement.SceneManager.GetActiveScene().name);
	}
	
}