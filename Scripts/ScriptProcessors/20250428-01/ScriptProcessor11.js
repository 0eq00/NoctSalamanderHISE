 var eventID = 0;function onNoteOn()
{
	
}
 function onNoteOff()
{
	
}
 function onController()
{
	local number = Message.getControllerNumber();
	switch(number)
	{
		case 64:
		{
			local value=Message.getControllerValue();
			if (value == 127)
			{
				eventID = Synth.playNote(12, 113);			
			}
			else if (value == 0)
			{
				Synth.noteOffByEventId(eventID);
				Synth.playNote(14, 127);
			}
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
 