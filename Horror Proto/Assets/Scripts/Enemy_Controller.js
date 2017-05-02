#pragma strict

var player : GameObject;
var navpoints : GameObject[];

var eyepos : Vector3;

var staretim : float;
var searchtimer : float;

var viewrad : int;
var target : Vector3;

var state : int;
// Wander=0 Search=1 Chase=2 Hiding=3

var nagent : UnityEngine.AI.NavMeshAgent;

var hit: RaycastHit;

function Start () {
	
	//Get Waypoints
	navpoints = GameObject.FindGameObjectsWithTag("NavPoint");
	
	player = GameObject.FindWithTag("Player");
	target = transform.position;
	state = 0;

}

function Update () {

	eyepos = transform.position;
	eyepos.y = transform.position.y + 0.9;

	if (target != null)
	{
		GetComponent(UnityEngine.AI.NavMeshAgent).SetDestination(target);
	}
	
	/*/Door Opening Super Smart Logic Time.
	Debug.DrawRay (transform.position, transform.forward, Color.blue);
	if (Physics.Raycast (transform.position, transform.forward, hit, 2))
	{
		if (hit.transform.tag == "Door")
		{
			print("DOOR");
			hit.transform.SendMessage("Open");
		}
	}
	/*/
	
	//Close enough to grab player
	if (Physics.Raycast (eyepos, player.transform.position - eyepos, hit, 1))
	{
		if (hit.transform.tag == "Player")
		{
			if (state == 2)
			{
				print ("You Lost");
				SceneManagement.SceneManager.LoadScene(SceneManagement.SceneManager.GetActiveScene().name);
			}
		}
	}
	
	//Look for player
	var angle : float = Vector3.Angle(player.transform.position - transform.position, transform.forward);

	if(angle < viewrad) 
	{	
		if (Physics.Raycast (eyepos, player.transform.position - eyepos, hit, 999))
		{
			Debug.DrawRay (eyepos, player.transform.position - eyepos, Color.red);
			if (hit.transform.tag == "Player")
			{
				//Stare Timer
				if (staretim > 0)
				{
					staretim -= 1 * Time.deltaTime;
				}else
				{
					print ("Found Player");
					//RenderSettings.ambientLight = Color.red;
					searchtimer = 5;
					state = 2;
					GetComponent(UnityEngine.AI.NavMeshAgent).speed = 4;
					GetComponent(AudioSource).pitch = 1.6;
					target = player.transform.position;
				}
			}else if (state == 2)
			{
				//Last Known Position
				print ("Lost Player");
				staretim = 1;
				state = 1;
				target = player.transform.position;
				
			}
		}else
		{
			//Last Known Position
			print ("Lost Player");
			staretim = 1;
			state = 1;
			target = player.transform.position;
		}
	}
	
	//Wander AI
	if (state == 0)
	{
		//Refine This
		if (Vector3.Distance(transform.position, target) < 2)
		{
			NewWander();
		}
	}	
	
	//Search AI
	if (state == 1)
	{
		//Goto last know pos and search
		if (Vector3.Distance(transform.position, target) < 2)
		{
			//No More Footsteps
			GetComponent(AudioSource).pitch = 0;
			
			//Searching logic
			transform.eulerAngles.y -= 20 * Time.deltaTime;
			
			//Searching Give Up Timer
			if (searchtimer > 0){
				searchtimer -= 1 * Time.deltaTime;
			}else{
				state = 0;
				searchtimer = 5;
				GetComponent(UnityEngine.AI.NavMeshAgent).speed = 2;
				GetComponent(AudioSource).pitch = 0.8;
				//RenderSettings.ambientLight = Color.black;
				NewWander();
			}
		}
	}	
	
	//Chase AI
	if (state == 2)
	{
		//RenderSettings.ambientLight = Color.red;
		target = player.transform.position;
	}
	
}

function CatchPlayer () {
	
	print("Player Caught");
	
}

function NewWander () {
	
	target = navpoints[Random.Range(0,navpoints.length)].transform.position;
	print("New Wander");
	
}

function NoiseHeard (senpos : Vector3) {
	
	if (state != 2)
	{
		
		state = 1;
		target = senpos;
		
		//Charge Over
		GetComponent(UnityEngine.AI.NavMeshAgent).speed = 4;
		GetComponent(AudioSource).pitch = 1.6;
		
	}
	
}









