let QBCore = exports['qb-core'].GetCoreObject();
let NearGrandmas = false;
let isReviving = false;

class Vector3 {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

exports['qb-polyzone'].AddBoxZone('grandmas', new Vector3(2435.32, 4966.31, 42.35), 2.8, 2, {
  name: 'grandmas',
  heading: 315,
  minZ: 40.55,
  maxZ: 43.15
});

RegisterNetEvent('qb-polyzone:enter');
AddEventHandler('qb-polyzone:enter', function(name) {
  if (name == 'grandmas') {
    NearGrandmas = true;
    NearGrandmasHoe();
    exports['qb-ui'].showInteraction('[E] - Grandmas ($1000)');
  }
});

RegisterNetEvent('qb-polyzone:exit');
AddEventHandler('qb-polyzone:exit', function(name) {
  if (name == 'grandmas') {
    NearGrandmas = false;
  }
  exports['qb-ui'].hideInteraction();
});

function NearGrandmasHoe() {
  let intervalId = setInterval(function() {
    if (!NearGrandmas) {
      clearInterval(intervalId);
      return;
    }
    
    if (IsControlPressed(1, 38)) {
      TriggerServerEvent('grandmas:attempt:checkin');
    }
  }, 5);
}

RegisterNetEvent('grandmas:success:attempt');
AddEventHandler('grandmas:success:attempt', function() {
  if (isReviving) {
    return;
  }

  let playerPed = PlayerPedId();
  TaskStartScenarioInPlace(playerPed, 'WORLD_HUMAN_BUM_WASH', 0, true);

  isReviving = true;

  QBCore.Functions.Progressbar('grandmas', 'Healing...', 5000, false, true, {
    disableMovement: true,
    disableCarMovement: true,
    disableMouse: false,
    disableCombat: true,
  }, {}, {}, {}, function() {
    exports['ps-ui'].Circle(function(success) {
      if (success) {
        TriggerServerEvent('grandmas:bill');
        TriggerEvent('hospital:client:Revive');

        setTimeout(function() {
          ClearPedTasks(playerPed);
        }, 1000);
      }

      isReviving = false;
    });
  });
});
