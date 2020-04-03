param(
     [string]$FullBuildNumber,
     [string]$SourceBranch
)
Process {
	$MajorVersion = Get-Content ./MajorVersionNumber 
	$TimeStamp = $FullBuildNumber.Substring(0,$FullBuildNumber.IndexOf(' '))
	$SubVersion = $SourceBranch.replace("_","").replace("/","") 
	# Default build number with pre-release 
	$BuildNumber = "$MajorVersion.$TimeStamp-$SubVersion"
	# Default feed is TWM_SIPServices_Dev
   $TargetFeed = '1b2e480d-2efd-41ef-b91f-48600a08f262/6de3e84a-1920-49d5-b3e6-ce01acf72bef'
	$DesirableFeed = Get-Content ./TargetArtifactFeed


	if ($SourceBranch	-eq 'master'){
  	   #Release build number
		$BuildNumber = "$MajorVersion.$TimeStamp"
   	#feed is TWM_SIPServices
	   $TargetFeed = '936359c2-0431-4ff6-b96d-0be1f5dd3055'
	} elseif ($DesirableFeed.length -ne 0) {

	  switch -Wildcard ($DesirableFeed)
	  {
    	 '*QA1*' {$TargetFeed = '1b2e480d-2efd-41ef-b91f-48600a08f262/e685cd74-1d55-490b-8fcb-fa0809a61e00'}
  	  	 '*QA2*' {$TargetFeed = '1b2e480d-2efd-41ef-b91f-48600a08f262/679e7cf3-9759-47a6-b417-49d185ae9239'}
  	  	 '*QA3*' {$TargetFeed = '1b2e480d-2efd-41ef-b91f-48600a08f262/56e1e90b-83a9-451e-aac0-66618405aac9'}
  	  	 '*QA4*' {$TargetFeed = '1b2e480d-2efd-41ef-b91f-48600a08f262/20770564-2a18-4852-8835-95b8664e5ed2'}
       '*PSE_HF*' {$TargetFeed = '1b2e480d-2efd-41ef-b91f-48600a08f262/fecd39ed-b4ad-47a4-b86d-b5a5a44f43a4'}
       '*PSE_DEV*' {$TargetFeed = '1b2e480d-2efd-41ef-b91f-48600a08f262/23f65c18-d833-407d-9230-201538ab83c7'}
       '*CAT_DEV1*' {$TargetFeed = '1b2e480d-2efd-41ef-b91f-48600a08f262/2ebfbc9c-3c62-4f1d-9dd9-b81b1c4d3424'}
       '*CAT_DEV2*' {$TargetFeed = '1b2e480d-2efd-41ef-b91f-48600a08f262/73d96daf-59b1-4468-8671-9e3992943090'}
	  }
	}
	echo "##vso[task.setvariable variable=NugetVerion;isOutput=true]$BuildNumber"
	echo "##vso[task.setvariable variable=ArtifactFeed;isOutput=true]$TargetFeed"
   Write-host "BuildNumber: $BuildNumber"
   Write-host "TargetFeed: $TargetFeed"
}
