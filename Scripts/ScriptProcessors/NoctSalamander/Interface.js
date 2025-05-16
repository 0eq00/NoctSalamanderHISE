Content.makeFrontInterface(800, 340);

/* Panel Handling */
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
const var SoftPanelButton = Content.getComponent("SoftPanelButton");
const var MetronomePanelButton = Content.getComponent("MetronomePanelButton");
const var MixPanelButton = Content.getComponent("MixPanelButton");

const var VelocityPanel = Content.getComponent("VelocityPanel");
const var DamperPanel = Content.getComponent("DamperPanel");
const var SoftPanel = Content.getComponent("SoftPanel");
const var MetronomePanel = Content.getComponent("MetronomePanel");
const var MixPanel = Content.getComponent("MixPanel");

const var panels2 = [VelocityPanel, DamperPanel, SoftPanel, MetronomePanel, MixPanel];

inline function handlePanels2(panelToShow)
{
    for(p in panels2)
    {
		p.set("visible", panelToShow == p);    
    }
}

VelocityPanelButton.setValue(1);
handlePanels2(VelocityPanel);

const var SettingsPanelButton1 = Content.getComponent("SettingsPanelButton1");
const var SettingsPanelButton2 = Content.getComponent("SettingsPanelButton2");

const var SettingsPanel1 = Content.getComponent("SettingsPanel1");
const var SettingsPanel2 = Content.getComponent("SettingsPanel2");

const var panels3 = [SettingsPanel1, SettingsPanel2];

inline function handlePanels3(panelToShow)
{
    for(p in panels3)
    {
		p.set("visible", panelToShow == p);    
    }
}

SettingsPanelButton1.setValue(1);
handlePanels3(SettingsPanel1);

/* Main */

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

const var DefaultEnvelope1 = Synth.getModulator("DefaultEnvelope1");
const var DefaultEnvelope3 = Synth.getModulator("DefaultEnvelope3");
const var DefaultEnvelope4 = Synth.getModulator("DefaultEnvelope4");
const var DefaultEnvelope5 = Synth.getModulator("DefaultEnvelope5");
const var DefaultEnvelope6 = Synth.getModulator("DefaultEnvelope6");
const var DefaultEnvelope7 = Synth.getModulator("DefaultEnvelope7");
const var DefaultEnvelope8 = Synth.getModulator("DefaultEnvelope8");

const var Release = Synth.getChildSynth("Release");

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
	ResultDamper.setValue(value);

	if ( rate > 0 )
	{
		Release.setAttribute(Release.Gain, 0);
	}
	else
	{
		Release.setAttribute(Release.Gain, 1);
	}

	DefaultEnvelope1.setAttribute(DefaultEnvelope1.Release, value);
	DefaultEnvelope3.setAttribute(DefaultEnvelope3.Release, value);
	DefaultEnvelope4.setAttribute(DefaultEnvelope4.Release, value);
	DefaultEnvelope5.setAttribute(DefaultEnvelope5.Release, value);
	DefaultEnvelope6.setAttribute(DefaultEnvelope6.Release, value);
	DefaultEnvelope7.setAttribute(DefaultEnvelope7.Release, value);
	DefaultEnvelope8.setAttribute(DefaultEnvelope8.Release, value);
};

/* Key Velocity */

Synth.getModulator("VelocityMapper").setBypassed(true);
const var VelocityMapper = Synth.getTableProcessor("VelocityMapper");
const var VelocityTable = VelocityMapper.getTable(0);
const var InputVelocity = Content.getComponent("InputVelocity");
const var OutputVelocity = Content.getComponent("OutputVelocity");
const var ResetVelocityTable = Content.getComponent("ResetVelocityTable");
const var ExportVelocityTable = Content.getComponent("ExportVelocityTable");
const var ImportVelocityTable = Content.getComponent("ImportVelocityTable");
const var FormatVelocity = Content.getComponent("FormatVelocity");
const var VelocityLabel  = Content.getComponent("VelocityLabel");

FormatVelocity.setValue(1);

function VelocityExportText()
{
	var array = VelocityTable.getTablePointsAsArray();
	var contents = "";
	var x = 0;
	var y = 0;
	var z = 0;
	for(i = 0; i < array.length; i++)
	{
		x = Math.round(array[i][0]*127);
		y = Math.round(array[i][1]*127);
		z = array[i][2];
//		Console.print("["+x+"]["+y+"]["+z+"]");
		contents += x + "\t" + y + "\t" + z + "\n";	
	}
	VelocityLabel.setValue(contents);
}

function VelocityImportText()
{
	var contents = VelocityLabel.getValue();
	var lines = contents.split("\n");
	var x = 0;
	var y = 0;
	var z = 0;
	var array = [[]];
	var point = [];
	if ( lines != NULL )
	{
		array.clear();

		for(i = 0; i < lines.length; i++)
		{
//			Console.print(lines[i]);
			var values = lines[i].split("\t");
			if ( values != NULL)
			{
//				Console.print("0["+values[0].charAt(0)+"]");
				if (values[0] != NULL)
				{
					if (values[0].charAt(0) >= '0' && values[0].charAt(0) <= '9')
					{
//						Console.print("a["+values[0]+"]["+values[1]+"]["+values[2]+"]");
						x = parseInt(values[0],10)/127;

						if (values[1]!= NULL)
							y = parseInt(values[1],10)/127;
						else
							y = 0;

						if (values[2]!= NULL)
							z = values[2];
						else
							z = 0.5;
//						Console.print("b["+x+"]["+y+"]["+z+"]");
						array.push([x,y,z]);
					}
				}
			}
		}
		VelocityTable.setTablePointsFromArray(array);
	}
}

/* Soft Pedal */

const var Soft6Gain = Content.getComponent("Soft6Gain");
const var Soft6Cutoff = Content.getComponent("Soft6Cutoff");
const var SoftGain6 = Synth.getEffect("Soft Gain6");
const var SoftGain7 = Synth.getEffect("Soft Gain7");
const var Filter6 = Synth.getEffect("Filter6");
const var Filter7 = Synth.getEffect("Filter7");

/* Metronome */

const var Metronome = Synth.getChildSynth("Metronome");

const var MetronomeTempoSlider = Content.getComponent("MetronomeTempoSlider");
const var MetronomeBeatSlider = Content.getComponent("MetronomeBeatSlider");
const var MetronomeStartButton = Content.getComponent("MetronomeStartButton");
const var MetronomeStopButton = Content.getComponent("MetronomeStopButton");
const var MetronomeSyncButton = Content.getComponent("MetronomeSyncButton");

MetronomeStartButton.setValue(0);
MetronomeStopButton.setValue(1);
MetronomeSyncButton.setValue(0);

var MetronomeIsRunnig = false;
var MetronomeBeatCount = 0;
var MetronomeInSync = false;

inline function MetronomeControlCB(component, value)
{
	switch (component)
	{
		case MetronomeStopButton:
			MetronomeIsRunnig = false;
			Synth.stopTimer();
//			Console.print("Stop timer");
			break;
		case MetronomeStartButton:
			if ( ! MetronomeIsRunnig )
			{
				MetronomeBeatCount = 0;
				MetronomeIsRunnig = true;
				reg milisec = Engine.getMilliSecondsForQuarterBeatsWithTempo(1,MetronomeTempoSlider.getValue());
				Synth.startTimer( milisec / 1000 );
//				Console.print("Start timer");
			}
			break;
		case MetronomeSyncButton:
			if ( value > 0 )
				MetronomeInSync = true;
			else
				MetronomeInSync = false;
			break;
	}
}

MetronomeTempoSlider.setControlCallback(MetronomeControlCB);
MetronomeBeatSlider.setControlCallback(MetronomeControlCB);
MetronomeStartButton.setControlCallback(MetronomeControlCB);
MetronomeStopButton.setControlCallback(MetronomeControlCB);
MetronomeSyncButton.setControlCallback(MetronomeControlCB);

/* Metronome Host Sync */
const var th = Engine.createTransportHandler();
th.setSyncMode(th.PreferExternal);
// th.setSyncMode(th.Inactive);
th.setEnableGrid(true, 8);

inline function OnBeatChange(beatIndex, isNewBar)
{
//	Console.print("beatIndex["+beatIndex +"]isNewBar["+isNewBar+"]");
	if ( MetronomeInSync )
	{
		Synth.playNote(16, 127);
		if ( isNewBar )
			Synth.playNote(17, 127);	
	}
};
th.setOnBeatChange(SyncNotification, OnBeatChange);
inline function gridCallback(index, timestamp, isFirst)
{
//	Console.print("grid index["+index +"]timestamp["+isFirst+"]");	
	if ( MetronomeInSync )
	{
		if ( isFirst )
			Synth.playNote(17, 127);
	}
}
th.setOnGridChange(SyncNotification, gridCallback);

/* Mix */

const var matrix = Synth.getRoutingMatrix("NoctSalamander");

inline function mix_initialize()
{
	local success1 = true;
	local success2 = true;
	success1 = matrix.addConnection(0, 0);
	success2 = matrix.addConnection(1, 1);
	if ( success1 && success2 )
		Content.getComponent("MixChTitle1").setValue("1 + 2");
	else
		Content.getComponent("MixChTitle1").setValue("- - -");

	success1 = matrix.addConnection(2, 2);
	success2 = matrix.addConnection(3, 3);
	if ( success1 && success2 )
		Content.getComponent("MixChTitle2").setValue("3 + 4");
	else
		Content.getComponent("MixChTitle2").setValue("- - -");

	success1 = matrix.addConnection(4, 4);
	success2 = matrix.addConnection(5, 5);
	if ( success1 && success2 )
		Content.getComponent("MixChTitle3").setValue("5 + 6");
	else
		Content.getComponent("MixChTitle3").setValue("- - -");

	success1 = matrix.addConnection(6, 6);
	success2 = matrix.addConnection(7, 7);
	if ( success1 && success2 )
		Content.getComponent("MixChTitle4").setValue("7 + 8");
	else
		Content.getComponent("MixChTitle4").setValue("- - -");

	success1 = matrix.addConnection(8, 8);
	success2 = matrix.addConnection(9, 9);
	if ( success1 && success2 )
		Content.getComponent("MixChTitle5").setValue("9 + 10");
	else
		Content.getComponent("MixChTitle5").setValue("- - -");

	success1 = matrix.addConnection(10, 10);
	success2 = matrix.addConnection(11, 11);
	if ( success1 && success2 )
		Content.getComponent("MixChTitle6").setValue("11 + 12");
	else
		Content.getComponent("MixChTitle6").setValue("- - -");
}
mix_initialize();

/* Samaple format */

const var SampleFormatComboBox = Content.getComponent("SampleFormatComboBox");

function loadSamplemap( value )
{
	// WAV
	if ( value > 1)
	{
		Synth.getChildSynth("Sustain1").asSampler().loadSampleMap("sustain-wav");
		Synth.getChildSynth("Sustain2").asSampler().loadSampleMap("sustain-wav");
		Synth.getChildSynth("Soft1").asSampler().loadSampleMap("sustain-wav");
		Synth.getChildSynth("Soft2").asSampler().loadSampleMap("sustain-wav");
		Synth.getChildSynth("Soft3").asSampler().loadSampleMap("sustain-wav");
		Synth.getChildSynth("Soft4").asSampler().loadSampleMap("sustain-wav");
		Synth.getChildSynth("Soft5").asSampler().loadSampleMap("sustain-wav");
		Synth.getChildSynth("Soft6").asSampler().loadSampleMap("sustain-wav");
		Synth.getChildSynth("Soft7").asSampler().loadSampleMap("sustain-wav");
		Synth.getChildSynth("Soft8").asSampler().loadSampleMap("sustain-wav");
		Synth.getChildSynth("Release1").asSampler().loadSampleMap("release1-wav");
		Synth.getChildSynth("Release2").asSampler().loadSampleMap("release2-wav");
		Synth.getChildSynth("Release3").asSampler().loadSampleMap("release3-wav");
		Synth.getChildSynth("Release4").asSampler().loadSampleMap("release4-wav");
		Synth.getChildSynth("Release5").asSampler().loadSampleMap("release5-wav");
		Synth.getChildSynth("Release6").asSampler().loadSampleMap("release6-wav");
		Synth.getChildSynth("Release7").asSampler().loadSampleMap("release7-wav");
		Synth.getChildSynth("Hammer").asSampler().loadSampleMap("hammer-wav");
		Synth.getChildSynth("Pedal").asSampler().loadSampleMap("pedal-wav");
	}
	// HLAC
	else
	{
		Synth.getChildSynth("Sustain1").asSampler().loadSampleMap("sustain");
		Synth.getChildSynth("Sustain2").asSampler().loadSampleMap("sustain");
		Synth.getChildSynth("Soft1").asSampler().loadSampleMap("sustain");
		Synth.getChildSynth("Soft2").asSampler().loadSampleMap("sustain");
		Synth.getChildSynth("Soft3").asSampler().loadSampleMap("sustain");
		Synth.getChildSynth("Soft4").asSampler().loadSampleMap("sustain");
		Synth.getChildSynth("Soft5").asSampler().loadSampleMap("sustain");
		Synth.getChildSynth("Soft6").asSampler().loadSampleMap("sustain");
		Synth.getChildSynth("Soft7").asSampler().loadSampleMap("sustain");
		Synth.getChildSynth("Soft8").asSampler().loadSampleMap("sustain");
		Synth.getChildSynth("Release1").asSampler().loadSampleMap("release1");
		Synth.getChildSynth("Release2").asSampler().loadSampleMap("release2");
		Synth.getChildSynth("Release3").asSampler().loadSampleMap("release3");
		Synth.getChildSynth("Release4").asSampler().loadSampleMap("release4");
		Synth.getChildSynth("Release5").asSampler().loadSampleMap("release5");
		Synth.getChildSynth("Release6").asSampler().loadSampleMap("release6");
		Synth.getChildSynth("Release7").asSampler().loadSampleMap("release7");
		Synth.getChildSynth("Hammer").asSampler().loadSampleMap("hammer");
		Synth.getChildSynth("Pedal").asSampler().loadSampleMap("pedal");
	}
}

function loadSampleFormatState()
{
	var Flag = FileSystem.fromAbsolutePath(FileSystem.getFolder(FileSystem.AppData).toString(0)+"/format-WAV");

	// WAV
	if ( Flag.isDirectory() )
	{
//		Console.print("true Path["+Flag.toString(0) +"]");
		loadSamplemap(2);
		SampleFormatComboBox.setValue(2);
	}
	// HLAC
	else
	{		
//		Console.print("false Path["+Flag.toString(0) +"]");
		loadSamplemap(1);
		SampleFormatComboBox.setValue(1);
	}
}
loadSampleFormatState();

inline function SampleFormatComboBoxCB(component, value)
{
	Console.print("SampleFormatComboBox["+value+"]");
	if ( value > 1 )
	{
		loadSamplemap(2);
		FileSystem.getFolder(FileSystem.AppData).createDirectory("format-WAV");
	}
	else
	{
		loadSamplemap(1);
		local Flag = FileSystem.fromAbsolutePath(FileSystem.getFolder(FileSystem.AppData).toString(0)+"/format-WAV");
		Flag.deleteFileOrDirectory();
	}
};
SampleFormatComboBox.setControlCallback(SampleFormatComboBoxCB);
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
//	Console.print("On timer");

/* Metronome */	

	Synth.playNote(16, 127);
	if ( MetronomeBeatCount == 0 )
	{
		if ( MetronomeBeatSlider.getValue() > 0 )
			Synth.playNote(17, 127);
	}
	MetronomeBeatCount++;
	if (MetronomeBeatCount >= MetronomeBeatSlider.getValue())
		MetronomeBeatCount = 0;
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
		case SoftPanelButton:
			if ( value > 0 )
				handlePanels2(SoftPanel);
			break;
		case MetronomePanelButton:
			if ( value > 0 )
				handlePanels2(MetronomePanel);
			break;
		case MixPanelButton:
			if ( value > 0 )
				handlePanels2(MixPanel);
			break;
		case SettingsPanelButton1:
			if ( value > 0 )
				handlePanels3(SettingsPanel1);
			break;
		case SettingsPanelButton2:
			if ( value > 0 )
				handlePanels3(SettingsPanel2);
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
			{
				if (FormatVelocity.getValue() < 2)
					VelocityLabel.setValue(VelocityMapper.exportAsBase64(0));
				else
					VelocityExportText();
			}
			break;
		case ImportVelocityTable:
			if ( value < 1 )
			{
				if (FormatVelocity.getValue() < 2)
					VelocityMapper.restoreFromBase64(0,VelocityLabel.getValue());
				else
					VelocityImportText();
			}
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
		case Soft6Gain:
			SoftGain6.setAttribute(SoftGain6.Gain,value);
			SoftGain7.setAttribute(SoftGain7.Gain,value);
			break;
		case Soft6Cutoff:
			Filter6.setAttribute(Filter6.Frequency,value);
			Filter7.setAttribute(Filter7.Frequency,value);
			break;
	}
}
 
