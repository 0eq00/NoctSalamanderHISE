Content.makeFrontInterface(800, 340);

const var MainPanelButton = Content.getComponent("MainPanelButton");
const var FXPanelButton = Content.getComponent("FXPanelButton");
const var DetailPanelButton = Content.getComponent("DetailPanelButton");
const var PresetsPanelButton = Content.getComponent("PresetsPanelButton");
const var SettingsPanelButton = Content.getComponent("SettingsPanelButton");
const var LoadDefaultButton = Content.getComponent("LoadDefaultButton");

const var MainPanel = Content.getComponent("MainPanel");
const var FXPanel = Content.getComponent("FXPanel");
const var DetailPanel = Content.getComponent("DetailPanel");
const var PresetsPanel = Content.getComponent("PresetsPanel");
const var SettingsPanel = Content.getComponent("SettingsPanel");

const var panels1 = [MainPanel, FXPanel, DetailPanel, PresetsPanel, SettingsPanel];

inline function handlePanels1(panelToShow)
{
    for(p in panels1)
    {
		p.set("visible", panelToShow == p);    
    }
}

MainPanelButton.setValue(1);
handlePanels1(MainPanel);

const var VelocityPanelButton = Content.getComponent("VelocityPanelButton");
const var DamperPanelButton = Content.getComponent("DamperPanelButton");

const var VelocityPanel = Content.getComponent("VelocityPanel");
const var DamperPanel = Content.getComponent("DamperPanel");

const var panels2 = [VelocityPanel, DamperPanel];

inline function handlePanels2(panelToShow)
{
    for(p in panels2)
    {
		p.set("visible", panelToShow == p);    
    }
}

VelocityPanelButton.setValue(1);
handlePanels2(VelocityPanel);

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

const var DEFAULT_DAMPER = "48...............vONOzQ9.........vOPhEP+....9SMn+dO...f+....9C...vO";
var releaseTime=500;
var releaseTimeR100=8000;
var releaseTimeMAX=20000;
var valueCC64=0;

Synth.getModulator("DamperMapper").setBypassed(true);
const var DamperMapper = Synth.getTableProcessor("DamperMapper");
const var DamperTable = DamperMapper.getTable(0);
const var InputDamper = Content.getComponent("InputDamper");
const var OutputDamper = Content.getComponent("OutputDamper");
const var ResetDamperTable = Content.getComponent("ResetDamperTable");
const var ExportDamperTable = Content.getComponent("ExportDamperTable");
const var ImportDamperTable = Content.getComponent("ImportDamperTable");
const var DamperLabel  = Content.getComponent("DamperLabel");
const var ReleaseTimeR100 = Content.getComponent("ReleaseTimeR100");
const var ResultDamper = Content.getComponent("ResultDamper");

inline function ChangeDamperState()
{
	local value = releaseTime;
	local rate = DamperTable.getTableValueNormalised(valueCC64/127);

	if ( rate < 1 )
	{
		value = releaseTime + (releaseTimeR100 - releaseTime)*rate;
	}
	else
	{
		value = releaseTimeMAX;				
	}

	OutputDamper.setValue(rate);
	ResultDamper.setValue( Engine.doubleToString(value, 0) + " ms");

	if ( rate > 0 )
	{
		Release1.setAttribute(Release1.Gain, 0);
		Release2.setAttribute(Release2.Gain, 0);
		Release3.setAttribute(Release3.Gain, 0);
		Release4.setAttribute(Release4.Gain, 0);
		Release5.setAttribute(Release5.Gain, 0);
		Release6.setAttribute(Release6.Gain, 0);
		Release7.setAttribute(Release7.Gain, 0);
	}
	else
	{
		Release1.setAttribute(Release1.Gain, 0.63);
		Release2.setAttribute(Release2.Gain, 0.63);
		Release3.setAttribute(Release3.Gain, 0.63);
		Release4.setAttribute(Release4.Gain, 0.63);
		Release5.setAttribute(Release5.Gain, 1);
		Release6.setAttribute(Release6.Gain, 1);
		Release7.setAttribute(Release7.Gain, 1);		
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

Synth.getModulator("VelocityMapper").setBypassed(true);
const var VelocityMapper = Synth.getTableProcessor("VelocityMapper");
const var VelocityTable = VelocityMapper.getTable(0);
const var InputVelocity = Content.getComponent("InputVelocity");
const var OutputVelocity = Content.getComponent("OutputVelocity");
const var ResetVelocityTable = Content.getComponent("ResetVelocityTable");
const var ExportVelocityTable = Content.getComponent("ExportVelocityTable");
const var ImportVelocityTable = Content.getComponent("ImportVelocityTable");
const var VelocityLabel  = Content.getComponent("VelocityLabel");

function onNoteOn()
{
//	local noteNumber = Message.getNoteNumber();
	local velocity = Message.getVelocity();

	local mappedVelocity = VelocityTable.getTableValueNormalised(velocity/127)*127;

	InputVelocity.setValue( velocity );
	OutputVelocity.setValue(mappedVelocity);
//	Console.print("in[" + velocity + "] out[" + mappedVelocity + "]");

	Message.setVelocity(mappedVelocity);
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
			ChangeDamperState();
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
			Synth.sendController(67, value);
			break;
		case CC66:
			Synth.sendController(66, value);
			break;
		case CC64:
			valueCC64 = value;
			ChangeDamperState();
			Synth.sendController(64, value);
			break;
		case ReleaseTime:
			releaseTime = value;
			ChangeDamperState();
			break;
		case ReleaseTimeR100:
			releaseTimeR100 = value;
			ChangeDamperState();
			break;
		case ReleaseGain:
			ChangeReleaseGain(value);
			break;
		case HammerGain:
			ChangeHammerGain(value);
			break;
		case PedalGain:
			ChangePedalGain(value);
			break;
		case MainPanelButton:
			if ( value > 0 )
				handlePanels1(MainPanel);
			break;
		case FXPanelButton:
			if ( value > 0 )
				handlePanels1(FXPanel);
			break;
		case DetailPanelButton:
			if ( value > 0 )
				handlePanels1(DetailPanel);
			break;
		case PresetsPanelButton:
			if ( value > 0 )
				handlePanels1(PresetsPanel);
			break;
		case SettingsPanelButton:
			if ( value > 0 )
				handlePanels1(SettingsPanel);
			break;
		case VelocityPanelButton:
			if ( value > 0 )
				handlePanels2(VelocityPanel);
			break;
		case DamperPanelButton:
			if ( value > 0 )
				handlePanels2(DamperPanel);
			break;
		case LoadDefaultButton:
			if ( value < 1 )
				Engine.loadUserPreset("Default/Default/Default.preset");
			break;
		case ResetVelocityTable:
			if ( value < 1 )
				VelocityMapper.reset(0);
			break;
		case ExportVelocityTable:
			if ( value < 1 )
				VelocityLabel.setValue(VelocityMapper.exportAsBase64(0));
			break;
		case ImportVelocityTable:
			if ( value < 1 )
				VelocityMapper.restoreFromBase64(0,VelocityLabel.getValue());
			break;
		case InputVelocity:
			OutputVelocity.setValue(VelocityTable.getTableValueNormalised(value/127)*127);
			break;
		case ResetDamperTable:
			if ( value < 1 )
				DamperMapper.restoreFromBase64(0,DEFAULT_DAMPER);
			break;
		case ExportDamperTable:
			if ( value < 1 )
				DamperLabel.setValue(DamperMapper.exportAsBase64(0));
			break;
		case ImportDamperTable:
			if ( value < 1 )
				DamperMapper.restoreFromBase64(0,DamperLabel.getValue());
			break;
		case InputDamper:
			OutputDamper.setValue(DamperTable.getTableValueNormalised(value/127));
			break;
	}
}
 