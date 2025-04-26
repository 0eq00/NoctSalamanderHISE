Content.makeFrontInterface(800, 340);

const var MainPanelButton = Content.getComponent("MainPanelButton");
const var FXPanelButton = Content.getComponent("FXPanelButton");
const var PresetsPanelButton = Content.getComponent("PresetsPanelButton");
const var SettingsPanelButton = Content.getComponent("SettingsPanelButton");
const var LoadDefaultButton = Content.getComponent("LoadDefaultButton");

const var MainPanel = Content.getComponent("MainPanel");
const var FXPanel = Content.getComponent("FXPanel");
const var PresetsPanel = Content.getComponent("PresetsPanel");
const var SettingsPanel = Content.getComponent("SettingsPanel");

const var panels = [MainPanel, FXPanel, PresetsPanel, SettingsPanel];

inline function handlePanels(panelToShow)
{
    for(p in panels)
    {
		p.set("visible", panelToShow == p);    
    }
}

MainPanelButton.setValue(1);
handlePanels(MainPanel);
LoadDefaultButton.setValue(1);

for(i = 0; i < 127; i++)
{
    if(i >= 21 && i <= 108)
    	Engine.setKeyColour(i, 0x22FFFFFF);    
    else
    	Engine.setKeyColour(i, 0x77000000);
};

const var CC67 = Content.getComponent("CC67");
const var CC66 = Content.getComponent("CC66");
const var CC64 = Content.getComponent("CC64");
const var ReleaseTime = Content.getComponent("ReleaseTime");
const var ReleaseGain = Content.getComponent("ReleaseGain");
const var HammerGain = Content.getComponent("HammerGain");
const var PedalGain = Content.getComponent("PedalGain");

const var DefaultEnvelope1 = Synth.getModulator("DefaultEnvelope1");
const var DefaultEnvelope3 = Synth.getModulator("DefaultEnvelope3");
const var DefaultEnvelope4 = Synth.getModulator("DefaultEnvelope4");
const var DefaultEnvelope5 = Synth.getModulator("DefaultEnvelope5");
const var DefaultEnvelope6 = Synth.getModulator("DefaultEnvelope6");
const var DefaultEnvelope7 = Synth.getModulator("DefaultEnvelope7");
const var DefaultEnvelope8 = Synth.getModulator("DefaultEnvelope8");

const var Release1 = Synth.getChildSynth("Release1");
const var Release2 = Synth.getChildSynth("Release2");
const var Release3 = Synth.getChildSynth("Release3");
const var Release4 = Synth.getChildSynth("Release4");
const var Release5 = Synth.getChildSynth("Release5");
const var Release6 = Synth.getChildSynth("Release6");
const var Release7 = Synth.getChildSynth("Release7");

var releaseTime=500;
var valueCC64=0;

inline function ChangeSustainPedalState()
{
	local value=0;

	value = releaseTime;

	if (valueCC64 < 40)
	{
		Release1.setAttribute(Release1.Gain, 0.63);
		Release2.setAttribute(Release2.Gain, 0.63);
		Release3.setAttribute(Release3.Gain, 0.63);
		Release4.setAttribute(Release4.Gain, 0.63);
		Release5.setAttribute(Release5.Gain, 1);
		Release6.setAttribute(Release6.Gain, 1);
		Release7.setAttribute(Release7.Gain, 1);
	}
	else
	{
		Release1.setAttribute(Release1.Gain, 0);
		Release2.setAttribute(Release2.Gain, 0);
		Release3.setAttribute(Release3.Gain, 0);
		Release4.setAttribute(Release4.Gain, 0);
		Release5.setAttribute(Release5.Gain, 0);
		Release6.setAttribute(Release6.Gain, 0);
		Release7.setAttribute(Release7.Gain, 0);

		if (valueCC64 < 60)
		{
			if ( value < 600 ) value = 600;
		}
		else if (valueCC64 < 80)
		{
			if ( value < 900 ) value = 900;
		}
		else if (valueCC64 < 100)
		{
			if ( value < 1200 ) value = 1200;
		}
		else if (valueCC64 < 120)
		{
			if ( value < 1500 ) value = 1500;
		}
		else
		{
			value = 20000;
		}
	}

	DefaultEnvelope1.setAttribute(DefaultEnvelope1.Release, value);
	DefaultEnvelope3.setAttribute(DefaultEnvelope3.Release, value);
	DefaultEnvelope4.setAttribute(DefaultEnvelope4.Release, value);
	DefaultEnvelope5.setAttribute(DefaultEnvelope5.Release, value);
	DefaultEnvelope6.setAttribute(DefaultEnvelope6.Release, value);
	DefaultEnvelope7.setAttribute(DefaultEnvelope7.Release, value);
	DefaultEnvelope8.setAttribute(DefaultEnvelope8.Release, value);
};

const var SimpleGain1 = Synth.getEffect("Simple Gain1");
const var SimpleGain2 = Synth.getEffect("Simple Gain2");
const var SimpleGain3 = Synth.getEffect("Simple Gain3");
const var SimpleGain4 = Synth.getEffect("Simple Gain4");
const var SimpleGain5 = Synth.getEffect("Simple Gain5");
const var SimpleGain6 = Synth.getEffect("Simple Gain6");
const var SimpleGain7 = Synth.getEffect("Simple Gain7");

inline function ChangeReleaseGain( value )
{
	SimpleGain1.setAttribute(SimpleGain1.Gain, value);
	SimpleGain2.setAttribute(SimpleGain2.Gain, value);
	SimpleGain3.setAttribute(SimpleGain3.Gain, value);
	SimpleGain4.setAttribute(SimpleGain4.Gain, value);
	SimpleGain5.setAttribute(SimpleGain5.Gain, value);
	SimpleGain6.setAttribute(SimpleGain6.Gain, value);
	SimpleGain7.setAttribute(SimpleGain7.Gain, value);
};

const var SimpleGain8 = Synth.getEffect("Simple Gain8");

inline function ChangeHammerGain( value )
{
	SimpleGain8.setAttribute(SimpleGain8.Gain, value);
};

const var SimpleGain9 = Synth.getEffect("Simple Gain9");

inline function ChangePedalGain( value )
{
	SimpleGain9.setAttribute(SimpleGain9.Gain, value);
};
function onNoteOn()
{
	local noteNumber = Message.getNoteNumber();

	// Notes with dampers
	if(noteNumber < 89)
	{
	}
	// Notes without dampers
	else
	{
	}

	// SoftPedal ON
	if(CC67.getValue()==1)
	{
		if(noteNumber < 35)
		{
		}
		else if(noteNumber < 47)
		{
		}
		else if(noteNumber < 59)
		{
		}
		else if(noteNumber < 71)
		{
		}
		else if(noteNumber < 83)
		{
		}
		else if(noteNumber < 95)
		{
		}
		else
		{
		}
	}
	// SoftPedal OFF
	else
	{
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
			CC67.setValue(Message.getControllerValue());
			break;
		}
		case 66:
		{
			CC66.setValue(Message.getControllerValue());
			break;
		}
		case 64:
		{
			valueCC64=Message.getControllerValue();
			CC64.setValue(valueCC64);
			ChangeSustainPedalState();
			break;
		}
	}
}
 function onTimer()
{
	
}
 function onControl(number, value)
{
	switch(number)
	{
		case CC67:
		{
			Synth.sendController(67, value);
			break;
		}
		case CC66:
		{
			Synth.sendController(66, value);
			break;
		}
		case CC64:
		{
			valueCC64 = value;
			ChangeSustainPedalState();
			Synth.sendController(64, value);
			break;
		}
		case ReleaseTime:
		{
			releaseTime = value;
			ChangeSustainPedalState();
			break;
		}
		case ReleaseGain:
		{
			ChangeReleaseGain(value);
			break;
		}
		case HammerGain:
		{
			ChangeHammerGain(value);
			break;
		}
		case PedalGain:
		{
			ChangePedalGain(value);
			break;
		}
		case MainPanelButton:
		{
			if ( value > 0 )
			{
				handlePanels(MainPanel);
			}
			break;
		}
		case FXPanelButton:
		{
			if ( value > 0 )
			{
				handlePanels(FXPanel);
			}
			break;
		}
		case PresetsPanelButton:
		{
			if ( value > 0 )
			{
				handlePanels(PresetsPanel);
			}
			break;
		}
		case SettingsPanelButton:
		{
			if ( value > 0 )
			{
				handlePanels(SettingsPanel);
			}
			break;
		}
		case LoadDefaultButton:
		{
			if ( value < 1 )
			{
				LoadDefaultButton.setValue(1);
				Engine.loadUserPreset("Default/Default/Default.preset");
			}
			break;
		}
	}
}
 