class DistanceCalculator {
    /*
    2座標間の距離を計算するメソッド
    lat1, lon1: 最初の座標の緯度と経度
    lat2, lon2: 2番目の座標の緯度と経度
    戻り値: 2座標間の距離（メートル単位）
    */
    static calculateDistance(lat1, lon1, lat2, lon2) {
        const toRadians = degrees => degrees * (Math.PI / 180);
        const baseDistance = 111.111111;

        const side1 = Math.abs(lat1 - lat2) * baseDistance;
        const avgLon = (lon1 + lon2) / 2;
        const side2 = baseDistance * Math.cos(toRadians(avgLon));

        const distance = Math.sqrt(Math.pow(side1, 2) + Math.pow(side2, 2));
        return distance;
    }
}