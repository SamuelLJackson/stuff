# Introduction 
Apex Client Application 


# Build
The Repository is CI. 
<b>The build pipeline [TotalWine.OrderSeries.App](https://totalwinemore.visualstudio.com/TWM%20Agile%20Projects/_build?definitionId=295&_a=summary&view=branches)</b>

###Branches that trigger the build:
- master
- cat*
- hf*

# Artifact 
##Nuget package
### Package Name: TotalWine.OrderSeries.App 
### Package Version: 
- Release version (Branch Master): <b>MM.YYYYMMDD.R</b>
- Pre-Release version (non-Master branches): <b>MM.YYYYMMDD.R-branchname</b>

where:
- MM - Major Release version taken from file BuildAutomation/MajorVersionNumber
- YYYYMMDD - The build daystamp
- R - Dayly build number
- branchname - branch name without special symbols: "_", "/"

More information about [package versioning](https://docs.microsoft.com/en-us/nuget/concepts/package-versioning)

##Artifacts feed
1. Release feed [TWM_SIPServices](https://totalwinemore.visualstudio.com/TWM%20Agile%20Projects/_packaging?_a=feed&feed=TWM_SIPServices)
 Build from master always drop artifacts here
2. Default Dev feed [TWM_SIPServices_Dev](https://totalwinemore.visualstudio.com/TWM%20Agile%20Projects/_packaging?_a=feed&feed=TWM_SIPServices_Dev)
 All non master build drop artifacts here by default
2. Teams Dev feed 
  if you would like the pipeline drop Nuget in specific environamnet feed provide ffed name in file BuildAutomation/TargetArtifactFeed
- [TWM_SIPServices_CAT_QA1](https://totalwinemore.visualstudio.com/TWM%20Agile%20Projects/_packaging?_a=feed&feed=TWM_SIPServices_CAT_QA1)
- [TWM_SIPServices_CAT_QA2](https://totalwinemore.visualstudio.com/TWM%20Agile%20Projects/_packaging?_a=feed&feed=TWM_SIPServices_CAT_QA2)
- [TWM_SIPServices_CAT_QA3](https://totalwinemore.visualstudio.com/TWM%20Agile%20Projects/_packaging?_a=feed&feed=TWM_SIPServices_CAT_QA3)
- [TWM_SIPServices_CAT_QA4](https://totalwinemore.visualstudio.com/TWM%20Agile%20Projects/_packaging?_a=feed&feed=TWM_SIPServices_CAT_QA4)
- [TWM_SIPServices_PSE_HF](https://totalwinemore.visualstudio.com/TWM%20Agile%20Projects/_packaging?_a=feed&feed=TWM_SIPServices_PSE_HF)
- [TWM_SIPServices_PSE_DEV](https://totalwinemore.visualstudio.com/TWM%20Agile%20Projects/_packaging?_a=feed&feed=TWM_SIPServices_PSE_DEV)
- [TWM_SIPServices_CAT_DEV1](https://totalwinemore.visualstudio.com/TWM%20Agile%20Projects/_packaging?_a=feed&feed=TWM_SIPServices_CAT_DEV1)
- [TWM_SIPServices_CAT_DEV2](https://totalwinemore.visualstudio.com/TWM%20Agile%20Projects/_packaging?_a=feed&feed=TWM_SIPServices_CAT_DEV2)

# Usage
1. Add as artifact into Deployment pipeline with Source Alias: OrderSeries.App
2. Add Command line step with Script as follows:
	to be updated...

##Example 


