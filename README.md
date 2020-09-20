# ODK Central Parser

## Goal: 

In the context of the Burundi PID, make the submissions downloaded from ODK Central compatible with the Kobo format and ease the data processing pipeline. In this version, the asp field is splitted into 4 asp, asp2, asp3 and asp4 fields in order to be compatible with the existing arcGis scripts.

A windows executable has been created from pkg:

> npm i pkg -g  
> pkg .  
>  ... creates odk-parser-win.exe

## Usage: 
In a CMD shell (powershell) :
> odk-parser-win.exe *pathToFileName* *fileterValue* *filterField* 

* **pathToFileName**: the full path of the file to process - if omitted, other parameters need to be omitted too, and the file name is expected to be submissions.csv, located in the same directory as the odk-parser-win.exe executable. The extension of the file can be .zip or .csv. If the file is zipped it will be automatically unzipped prior being processed.
* **fileterValue**: the value used for filtering data - if filterField is omitted, the 'jour' field is used - if this value is omitted, there is no filtering, the output result file is suffixed with _all
* **filterField**: the field to act as a filter - default=jour

## Example: 
Process the all file: (note on windows for this case it is also possible to drag and drop the input file onto the executable) 
> odk-parser-win.exe pulverisation_2020.zip
> Processing ZIP  
> Processing CSV C:\Users\devuser\Desktop\odk\pulverisation_2020.csv  
> Done writing C:\Users\devuser\Desktop\odk\pulverisation_2020_all.csv, 34559 records

Process the jour=2  
> odk-parser-win.exe pulverisation_2020.zip 2
> Processing ZIP  
> Processing CSV C:\Users\devuser\Desktop\odk\pulverisation_2020.csv  
> Done writing C:\Users\devuser\Desktop\odk\pulverisation_2020_jour_2.csv, 2492 records  

Process the equip=26  
> odk-parser-win.exe pulverisation_2020.zip 26 equip
> Processing ZIP  
> Processing CSV C:\Users\devuser\Desktop\odk\pulverisation_2020.csv  
> Done writing C:\Users\devuser\Desktop\odk\pulverisation_2020_equip_26.csv, 497 records  
