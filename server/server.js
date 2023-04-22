let QBCore = exports['qb-core'].GetCoreObject();

QBCore.Functions.CreateCallback('grandmas:getBankMoney', function(source, cb) {
  const xPlayer = QBCore.Functions.GetPlayer(source);
  const bank = xPlayer.PlayerData.money["bank"];
  cb(bank);
});

RegisterServerEvent("grandmas:attempt:checkin");
AddEventHandler("grandmas:attempt:checkin", function() {
  const src = source;
  QBCore.Functions.TriggerCallback('grandmas:getBankMoney', src, function(bank) {
    if (bank >= 1000) {
      TriggerClientEvent("grandmas:success:attempt", src);
    } else {
      QBCore.Functions.Notify("You need $1000 in your bank account", "error");
    }
  });
});

RegisterServerEvent("grandmas:bill");
AddEventHandler("grandmas:bill", function() {
  const src = source;
  const xPlayer = QBCore.Functions.GetPlayer(src);
  xPlayer.Functions.RemoveMoney('bank', 1000);
});
