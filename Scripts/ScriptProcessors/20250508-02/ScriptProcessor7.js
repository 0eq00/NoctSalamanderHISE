var isSoftpedal=0;function onNoteOn()
{
	if(isSoftpedal < 1)
	{
		Message.ignoreEvent(true);	
	}
	else
	{
		if((Message.getNoteNumber() < 71)||(Message.getNoteNumber() > 82))
		{
			Message.ignoreEvent(true);
		}
	}
}
 function onNoteOff()
{
	
}
 function onController()
{
	local number = Message.getControllerNumber();
	switch(number)
	{
		case 67:
		{
			if(Message.getControllerValue()>64)
			{
				isSoftpedal=1;
			}
			else
			{
				isSoftpedal=0;		
			}
			break;
		}
		case 64:
		{
			Message.ignoreEvent(true);
			break;
		}
	}
}
 function onTimer()
{
	
}
 function onControl(number, value)
{
	
}
 