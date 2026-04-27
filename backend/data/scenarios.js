'use strict';

const scenarios = [
  {
    id: 1,
    title: 'La policia et demana identificar-te al carrer',
    context:
      'Tens 16 anys i estàs al carrer amb uns amics un dissabte a la tarda. Un agent de policia s\'acosta i et demana que t\'identifiquis. No has fet res il·legal.',
    situation:
      '¿Qué fas?',
    options: [
      {
        id: 'A',
        text: 'Et negues a identificar-te i marxes caminant.',
        consequence: 'Negatiu. Negar-te a identificar-te quan la policia té una causa raonable pot ser considerat una infracció lleu. L\'agent pot retenir-te per identificar-te al lloc. Marxar pot agreujar la situació.',
        legalRight: 'Tens l\'obligació d\'identificar-te si la policia al·lega una causa raonable, però no estàs obligat/ada a anar a comissaria si no estàs detingut/da.',
        legalExplanation:
          'L\'article 16 de la Llei Orgànica 4/2015 de Protecció de la Seguretat Ciutadana (LOPSC) estableix que els agents poden requerir la identificació de persones quan hi hagi indicis que han participat en una infracció o per prevenir un delicte. La negativa pot ser sancionada amb una multa de fins a 600 € (infracció lleu, art. 37.4 LOPSC). Si ets menor de 14 anys, s\'ha d\'avisar als teus tutors legals (art. 17.5 LOPSC).',
      },
      {
        id: 'B',
        text: 'T\'identifiques amb el DNI o targeta escolar, de forma tranquil·la, i preguntes el motiu.',
        consequence: 'Correcte. Identificar-te és la resposta adequada. Tens dret a saber per quin motiu et demanen la identificació, però has de fer-ho de forma respectuosa.',
        legalRight: 'Tens dret a conèixer el motiu de la identificació i a que l\'agent s\'identifiqui ell/a mateix/a. No estàs obligat/ada a respondre cap altra pregunta sense la presència d\'un advocat/ada.',
        legalExplanation:
          'L\'article 16.1 LOPSC permet la identificació amb qualsevol document oficial (DNI, passaport, permís de conducció). L\'article 16.2 obliga l\'agent a indicar la causa de la identificació si se li demana. Si la policia et vol traslladar a comissaria sense detenir-te formalment (identificació en dependències, art. 16.3 LOPSC), el màxim legal és 6 hores i s\'ha d\'avisar a la família si ets menor d\'edat (art. 520 bis LECrim). Durant tot el procés, el dret a no declarar contra un mateix/a està protegit per l\'article 24.2 de la Constitució Espanyola.',
      },
      {
        id: 'C',
        text: 'Et poses nerviós/a, insults l\'agent i intentes gravar-lo amb el mòbil.',
        consequence: 'Molt negatiu. Insultar un agent és un delicte de resistència o desobediència. Gravar a la policia en espais públics és legal, però no pot interferir en l\'actuació policial.',
        legalRight: 'Tens dret a gravar agents en l\'exercici de les seves funcions en espais públics, però el material ha d\'obtenir-se sense obstruir l\'actuació. Insultar és una infracció penal.',
        legalExplanation:
          'Insultar o faltar al respecte a un agent en exercici pot constituir el delicte d\'atemptat (art. 550 Codi Penal) o desobediència (art. 556 CP), amb penes de fins a 2 anys de presó per a majors d\'edat. Per a menors de 18 anys s\'aplica la Llei Orgànica 5/2000 de Responsabilitat Penal del Menor, amb mesures educatives. Quant a la gravació, el Tribunal Constitucional (STC 12/2012) reconeix el dret a gravar actuacions policials en espais públics com a exercici de la llibertat d\'informació (art. 20.1.d CE), sempre que no s\'obstaculitzi l\'actuació.',
      },
      {
        id: 'D',
        text: 'T\'identifiques, mantens la calma i, si consideres que l\'actuació és incorrecta, poses una queixa formal posteriorment.',
        consequence: 'Excel·lent. Aquesta és la resposta més intel·ligent: compleix amb la llei en el moment i exerceixes els teus drets de forma efectiva a través dels canals adequats.',
        legalRight: 'Tens dret a presentar una queixa formal per actuació policial irregular davant la Comissaria, la Fiscalia de Menors (si ets menor), el Defensor del Poble o els tribunals.',
        legalExplanation:
          'La queixa formal es pot presentar: (1) a la Comissaria Superior d\'Inspecció corresponent; (2) davant el Ministeri Fiscal, especialment la Fiscalia de Menors si l\'afectat és menor d\'edat (art. 4 LO 5/2000); (3) davant el Defensor del Poble (art. 54 CE), que supervisa l\'actuació de les administracions públiques. En cas d\'actuació policial vulneradora de drets fonamentals, es pot interposar un recurs d\'empara davant el Tribunal Constitucional (art. 53.2 CE). Cal documentar: hora, lloc, número de placa de l\'agent i testimonis.',
      },
    ],
  },

  {
    id: 2,
    title: 'T\'ofereixen un contracte de feina sense donar-te\'l per escrit',
    context:
      'Tens 17 anys i trobes feina de cambrer/a en un bar per als caps de setmana. El propietari et diu que "de paraula n\'hi ha prou" i que et pagarà en efectiu sense nòmina. Els teus pares ho saben i hi estan d\'acord.',
    situation:
      '¿Qué fas?',
    options: [
      {
        id: 'A',
        text: 'Acceptes les condicions verbals perquè necessites els diners i no vols complicar-ho.',
        consequence: 'Arriscat. Treballar sense contracte escrit et deixa sense protecció: no pots reclamar salaris impagats fàcilment, no cotitzes a la Seguretat Social, no tens cobertura en cas d\'accident laboral.',
        legalRight: 'Tens dret a exigir un contracte escrit en qualsevol moment. La llei protegeix el treballador/a fins i tot sense contracte escrit, però provar les condicions pactades és molt difícil.',
        legalExplanation:
          'L\'article 8.1 del Real Decret Legislatiu 2/2015 (Estatut dels Treballadors, ET) admet el contracte verbal, però l\'art. 8.2 obliga l\'empresari a formalitzar-lo per escrit quan el treballador ho sol·liciti. Treballar sense alta a la Seguretat Social és una infracció greu de l\'empresari (art. 22.2 LISOS) sancionable amb multes de 3.126 a 10.000 €. En cas d\'accident, si no estàs donat/da d\'alta, tens igualment dret a prestació (art. 166 LGSS), però l\'empresari n\'és responsable directe. A més, sense cotitzar no acumules drets de jubilació, atur ni baixes mèdiques.',
      },
      {
        id: 'B',
        text: 'Demanes el contracte per escrit i l\'alta a la Seguretat Social abans de començar.',
        consequence: 'Correcte. Protegir els teus drets des del principi és la millor opció. Un empresari seriós no hauria de posar-hi objeccions.',
        legalRight: 'Com a menor de 18 anys, tens dret a treballar amb autorització dels teus pares/tutors i amb totes les proteccions laborals (jornada màxima, salari mínim, descansos). No es pot contractar menors de 16 anys (amb algunes excepcions artístiques).',
        legalExplanation:
          'Per treballar amb 16 o 17 anys calen: (1) autorització expressa dels pares o tutors legals (art. 7.b ET); (2) contracte escrit; (3) alta a la Seguretat Social. L\'art. 6 ET prohibeix treballar als menors de 16 anys. Els menors de 18 anys no poden fer hores extraordinàries (art. 6.3 ET), treballar de nit (22h-6h, art. 6.2 ET) ni en feines perilloses (RD 1215/1997). La jornada màxima és de 8 hores diàries incloent-hi formació (art. 34.3 ET). El Salari Mínim Interprofessional s\'aplica íntegrament sense distinció d\'edat (art. 27 ET; el 2024 és de 1.134 €/mes per jornada completa).',
      },
      {
        id: 'C',
        text: 'Comences a treballar i, passades dues setmanes, l\'empresari no et paga. Araexigeixes el contracte.',
        consequence: 'La situació es complica. Sense contracte escrit, demostrar les condicions pactades és difícil, però no impossible: missatges de WhatsApp, testimonis de companys o clients poden ser proves vàlides.',
        legalRight: 'Tens dret a reclamar el salari impagat davant el Servei de Mediació, Arbitratge i Conciliació (SMAC) o la via judicial, encara que el contracte fos verbal.',
        legalExplanation:
          'L\'art. 29.3 ET permet reclamar salaris impagats amb interès de mora del 10% anual. El termini de prescripció és d\'1 any des que el salari era exigible (art. 59.2 ET). Com a prova, el Tribunal Suprem accepta: missatges de text/WhatsApp (STS 19/01/2017), testimonis, registres horaris, etc. El procediment gratuït per a treballadors: (1) denúncia a la Inspecció de Treball (gratuïta), (2) conciliació al SMAC (obligatòria prèvia al judici), (3) demanda al Jutjat Social. Si ets menor d\'edat, els teus pares/tutors hauran d\'actuar en nom teu en el procés judicial.',
      },
      {
        id: 'D',
        text: 'Consultes amb un sindicat o el Servei de Mediació abans de signar res.',
        consequence: 'Excel·lent. Informar-te abans de signar és sempre la millor decisió. Sindicats com CCOO o UGT ofereixen assessorament gratuït, i molts municipis tenen serveis d\'orientació laboral per a joves.',
        legalRight: 'Tens dret a l\'assistència sindical gratuïta (art. 28 CE) i a ser informat/ada de les teves condicions laborals per escrit (art. 8 ET i RD 1659/1998 sobre contingut mínim del contracte).',
        legalExplanation:
          'El RD 1659/1998 obliga a incloure al contracte: identitat de les parts, data d\'inici, durada, lloc de treball, categoria professional, salari base i complements, jornada i horari, i durada de les vacances. A més, el Reial Decret Llei 32/2021 de reforma laboral reforça l\'obligació de regularitzar contractes temporals. Per a menors, la Inspecció de Treball té potestat de denunciar d\'ofici situacions d\'explotació laboral (art. 5 Llei 23/2015 ordenadora del Sistema d\'Inspecció de Treball).',
      },
    ],
  },

  {
    id: 3,
    title: 'Un company publica fotos teves sense permís a les xarxes socials',
    context:
      'Tens 15 anys. Un company de classe publica a Instagram una foto on surts tu en una situació compromesa (una festa, en roba interior, o fent el ridícul). No li has donat permís i la foto t\'incomoda. Ja té 200 "m\'agrada".',
    situation:
      '¿Qué fas?',
    options: [
      {
        id: 'A',
        text: 'No fas res perquè tens por de quedar malament o de represàlies.',
        consequence: 'Negatiu per al teu benestar. No actuar permet que el dany s\'estengui. La imatge pot continuar circulant i generar situacions de ciberassetjament. Tens dret a actuar.',
        legalRight: 'La teva imatge és un dret fonamental protegit per la Constitució. Ningú pot publicar fotos teves sense el teu consentiment exprés, especialment si ets menor d\'edat.',
        legalExplanation:
          'L\'article 18.1 de la Constitució Espanyola protegeix el dret a la pròpia imatge com a dret fonamental. La Llei Orgànica 1/1982 de Protecció Civil del Dret a l\'Honor, la Intimitat Personal i Familiar i la Pròpia Imatge estableix al seu article 7.5 que és una intromissió il·legítima "la captació, reproducció o publicació per fotografia, filme o qualsevol altre procediment, de la imatge d\'una persona en llocs o moments de la seva vida privada". Per a menors d\'edat, el consentiment l\'han de donar els representants legals (art. 3 LO 1/1982) i mai no es pot presumir.',
      },
      {
        id: 'B',
        text: 'Li demanes directament que esborri la foto i, si no ho fa, la reportes a Instagram.',
        consequence: 'Bona primera resposta. Parlar directament pot resoldre la situació ràpidament. Si no funciona, les plataformes estan obligades a eliminar contingut que vulneri drets d\'imatge, especialment de menors.',
        legalRight: 'Tens dret a exigir la retirada immediata de qualsevol imatge teva publicada sense consentiment. Les plataformes digitals estan legalment obligades a eliminar-les si ho sol·licites.',
        legalExplanation:
          'El Reglament General de Protecció de Dades (RGPD, Reglament UE 2016/679), en el seu article 17, reconeix el "dret a la supressió" o "dret a l\'oblit": pots exigir que les teves dades (incloses imatges) siguin eliminades. La Llei Orgànica 3/2018 de Protecció de Dades Personals (LOPDGDD) estableix a l\'article 7 que l\'edat mínima de consentiment per al tractament de dades a Espanya és de 14 anys. Per sota d\'aquesta edat, cal el consentiment dels pares. El Reglament de Serveis Digitals de la UE (DSA, Reglament UE 2022/2065) obliga les plataformes a processar les denúncies de manera àgil.',
      },
      {
        id: 'C',
        text: 'Fas screenshots com a prova, reportes a Instagram, i si no retiren la foto en 48 hores, denúncies a l\'AEPD o als Mossos/Policia.',
        consequence: 'Excel·lent resposta. Guardar proves és fonamental. L\'Agència Espanyola de Protecció de Dades (AEPD) pot actuar d\'ofici i sancionar la plataforma o el responsable.',
        legalRight: 'Tens dret a presentar una reclamació gratuïta davant l\'AEPD (art. 77 LOPDGDD). Si hi ha ciberassetjament o difusió d\'imatges íntimes, és un delicte penal.',
        legalExplanation:
          'La seqüència legal recomanada és: (1) Sol·licitud de retirada a la plataforma (conserva el número de tiquet). (2) Reclamació a l\'AEPD (aepd.es, gratuïta, termini de resposta: 3 mesos). (3) Si hi ha assetjament continuat, denúncia als Mossos d\'Esquadra o Policia Nacional per possible delicte de ciberassetjament (art. 172 ter CP, assetjament) o, si les imatges són de contingut sexual, per l\'article 197.7 CP (difusió no consentida d\'imatges íntimes, pena de fins a 5 anys). Per a menors autors del delicte, s\'aplica la Llei Orgànica 5/2000 de Responsabilitat Penal del Menor. El centre educatiu també té l\'obligació d\'actuar si els fets ocorren en l\'entorn escolar (art. 124 LOE).',
      },
      {
        id: 'D',
        text: 'Publiques fotos comprometedores del company per venjar-te.',
        consequence: 'Molt negatiu. Fer-ho et convertiria igualment en infractor/a de la llei. Dos errors no fan un encert. Podries enfrontar-te a les mateixes conseqüències legals que el teu company.',
        legalRight: 'Tens drets legals per actuar, però exercir-los mai no implica vulnerar els drets d\'una altra persona. La venjança digital et pot convertir en autor/a d\'un delicte.',
        legalExplanation:
          'Publicar imatges d\'una altra persona sense consentiment, independentment del motiu, vulnera els mateixos drets fonamentals (art. 18.1 CE, LO 1/1982) i pot constituir els mateixos delictes (art. 197.7 CP). Si l\'altra persona és menor d\'edat i les imatges tenen contingut sexual, les penes s\'agreugen notablement (art. 189 CP, pornografia infantil). Els menors d\'entre 14 i 18 anys poden ser jutjats per la Fiscalia de Menors i sotmesos a mesures com llibertat vigilada, tasques socioeducatives o, en casos greus, internament en règim tancat. La via correcta és sempre l\'exercici dels propis drets pels canals legals.',
      },
    ],
  },
];

module.exports = scenarios;
