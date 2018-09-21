export class Address {
    static consolidate(data: object) {
        const address = [];
        const keys = ['Street__c', 'City__c', 'State__c', 'Country__c', 'Zip_Postal_Code__c'];

        keys.forEach(k => {
            if (data.hasOwnProperty(k) && data[k] !== '') {
                address.push(data[k]);
            }
        });

        return address.length > 0 ? address.join(',') : '';
    }
}


export class Print {
    constructor(contentsId, heading) {
        let printContents, popupWin;
        printContents = document.getElementById(contentsId).innerHTML;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write(`
          <html>
            <head>
              <link rel="stylesheet" type="text/css" href="../../../assets/plugins/bootstrap/css/bootstrap.min.css" />
            </head>
              <body onload="window.print(); window.close();">
              <h3>${heading}</h3>
              ${printContents}</body>
          </html>`
        );
        popupWin.document.close();
    }
}
/**
 * This class use for calculate distance and time between two latitudes and longitudes.
 */
export class MapUtility {
    /**
     * This method use for calculate distance between two latitudes and longitudes.
     * @param lat1 source location latitude.
     * @param lon1 source location longitude.
     * @param lat2 destination location latitude.
     * @param lon2 destination location longitude.
     * @param inMiles It's optional params if you need distance in Miles than pass `inMiles` is true.
     */
    calculateDistance(lat1, lon1, lat2, lon2, inMiles = false) {
        const R = 6371; // Radius of the earth in kilometers
        const dLat = this.deg2rad(lat2 - lat1); // deg2rad funcation below
        const dLon = this.deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c; // Distance in km
        if (inMiles) {
            d = d * 0.62137; // Distance in miles
        }
        const dist = parseInt(d.toString(), 10);
        return dist;
    }

    /**
     * This method use for calculate time on the behafe of two location distance.
     * @param distance distance between two latitudes and longitudes
     * @param inMiles It's optional params if `distance` params in miles than pass `inMiles` is true.
     */
    calculateTime(distance, inMiles = false) {
        let time;
        if (distance) {
            // convert miles to Km
            distance = inMiles ? (distance / 0.62137) : distance;
            // 50 => Average Speed
            time = distance / 50;
            // Hours convert to minutes => 1 hourse = 60 minuts
            const minutes = time * 60;
            if (minutes > 60) {
                // Convert minutes to hours/minutes
                const realMin = parseInt((minutes % 60).toString(), 10);
                const hours = Math.floor(minutes / 60)
                time = hours + ' hours ' + realMin + ' mins';
            } else {
                time = minutes + ' mins';
            }
            return time;
        } else {
            time = 'With in 5 mins';
        }
        return time;
    }

    /**
     * This funcation use in `calculateDistance` funcation.
     * @param angleInDegrees different between two latitudes and longitudes.
     */
    deg2rad(angleInDegrees) {
        return angleInDegrees * .017453292519943295
    }
}








