#pragma strict

var enemy : GameObject;

var eyes:GameObject;

private var movev:float;
private var moveh:float;
private var jump:float;
private var sprint:float;
private var crouch:float;
private var lean:float;
private var interact:float;

private var curspeed:float;

var stamina:float;
var sprintcost:float;
var stamregen:float;

var speed : float;
var sprintspeed : float;

var canjump:boolean;
var contact:ContactPoint;

var jumppower:float;

var Rig:Rigidbody;

var hit:RaycastHit;
var carrying:GameObject;

var mtim:float;

function Start () {
	
	Physics.IgnoreCollision(eyes.GetComponent(Collider), GetComponent(Collider));
	
	Rig = GetComponent.<Rigidbody>();
	
}

function FixedUpdate () {

	//setting movement inputs
	moveh = Input.GetAxisRaw ("Horizontal");
	movev = Input.GetAxisRaw ("Vertical");
	jump = Input.GetAxis ("Jump");
	sprint = Input.GetAxis ("Sprint");
	crouch = Input.GetAxis ("Crouch");
	lean = Input.GetAxis ("Lean");
	
	//Movement
	transform.eulerAngles.y = eyes.transform.eulerAngles.y;
	
	var movevec = new Vector3(moveh, 0, movev).normalized * Time.deltaTime * curspeed;
	
	movevec = transform.TransformDirection(movevec);
	
	GetComponent(Rigidbody).MovePosition(transform.position + movevec);
	
	//Crouch
	if (crouch != 0)
	{
		if (transform.localScale.y > 0.4)
		{
			transform.localScale.y -= 10 * Time.deltaTime;
		}else
		{
			transform.localScale.y = 0.4;
		}
		
	}else
	{
		//Check for standing room
		if (Physics.Raycast (transform.position, transform.up, 1))
		{
		}else
		{
			if (transform.localScale.y < 2)
			{
				transform.localScale.y += 10 * Time.deltaTime;
			}else
			{
				transform.localScale.y = 2;
			}
		}
	}
	
	//Sprint
	if (sprint != 0 && crouch == 0)
	{
		if (stamina > 0)
		{
			if (moveh != 0 || movev != 0)
			{
				if (GetComponent(AudioSource).isPlaying != true)
				{
					GetComponent(AudioSource).Play();
				}
				
				if (Vector3.Distance(transform.position, enemy.transform.position) < 15)
				{
					enemy.SendMessage("NoiseHeard", transform.position);
				}
				
				stamina -= sprintcost * Time.deltaTime;
				
			}else
			{
				if (stamina < 100)
				{
					stamina += stamregen * Time.deltaTime;
				}
			}
		}
		
	}else
	{
		if (stamina < 100)
		{
			stamina += stamregen * Time.deltaTime;
		}
	}
	
	//Player Speed
		//If Sprinting or Walking
	if (transform.localScale.y == 2)
	{
		if (sprint != 0 && stamina > 0)
		{
			curspeed = sprintspeed;
		}else
		{
			GetComponent(AudioSource).Stop();
			curspeed = speed;
		}
	}
		//If Crouching
	if (crouch != 0)
	{
		GetComponent(AudioSource).Stop();
		curspeed = 1.5;
	}
	
	//Leaning
	if (lean != 0)
	{
		if (lean == 1)
		{
			eyes.SendMessage("LeanLeft");
		}else{
			eyes.SendMessage("LeanRight");
		}
	}else{
		eyes.SendMessage("LeanClear");
	}
	
	//Jumping
	if (canjump == true){
		if (Input.GetAxis("Jump") == 1)
		{
			//Jump
			GetComponent.<Rigidbody>().AddForce(new Vector3 (0, jump * jumppower * Time.deltaTime, 0),ForceMode.Impulse);
			canjump = false;
			Rig.velocity = Vector3(0,0,0);
		}
	}
	
	//Pickup Object
	if (Input.GetAxisRaw("Right Mouse") != 0 && mtim <= 0)
	{	
		if (carrying == null)
		{
			if (Physics.Raycast (eyes.transform.position, eyes.transform.forward, hit, 2))
			{	
				if (hit.transform.tag == "PickUp")
				{
					
					//lock to eyes, disable collisions?
					carrying = hit.transform.gameObject;
					carrying.GetComponent(Rigidbody).useGravity = false;
					mtim = 0.5;
					
				}
			}	
		}else
		{
			
			//Drop
			carrying.GetComponent(Rigidbody).useGravity = true;
			carrying = null;
			mtim = 0.5;
			
		}
	}
	
	//Carrying
	if (carrying != null)
	{
		carrying.transform.position = eyes.transform.position - eyes.transform.forward * -1;
	}
	
	//Throwing
	if (Input.GetAxisRaw("Left Mouse") != 0 && mtim <= 0)
	{
		if (carrying != null)
		{
			carrying.GetComponent(Rigidbody).useGravity = true;
			carrying.GetComponent(Rigidbody).AddForce(eyes.transform.forward * 200);
			carrying = null;
			mtim = 0.5;
		}
	}
	
	//Mouse Control Timer
	if (mtim > 0)
	{
		mtim -= 1 * Time.deltaTime;
	}
	
}

function OnCollisionEnter(coll: Collision) {
	
	//Am I on the floor? Then I can jump!
	if(coll.contacts.Length > 0)
	{
		contact = coll.contacts[0];
		if(Vector3.Dot(contact.normal, Vector3.up) > 0.5)
		{
			canjump = true;
		}
	}
}